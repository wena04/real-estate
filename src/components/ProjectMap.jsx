import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import './ProjectMap.css';

function FitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) {
      map.setView([47.6062, -122.3321], 10);
      return;
    }
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 13);
      return;
    }

    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [35, 35] });
  }, [map, points]);

  return null;
}

function SelectedProjectFocus({ selectedSlug, points, markerRefs }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedSlug) return;

    const selectedPoint = points.find((point) => point.slug === selectedSlug);
    const marker = markerRefs.current[selectedSlug];
    if (!selectedPoint || !marker) return;

    map.panTo([selectedPoint.lat, selectedPoint.lng], { animate: true, duration: 0.45 });
    marker.openPopup();
  }, [map, markerRefs, points, selectedSlug]);

  return null;
}

function ProjectMap({ points, selectedSlug, onSelect }) {
  const markerRefs = useRef({});
  const defaultIcon = useMemo(
    () =>
      L.divIcon({
        className: 'project-pin-wrap',
        html: '<span class="project-pin"></span>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -12],
      }),
    []
  );

  const selectedIcon = useMemo(
    () =>
      L.divIcon({
        className: 'project-pin-wrap',
        html: '<span class="project-pin is-selected"></span>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -14],
      }),
    []
  );

  return (
    <div className="project-map-wrap">
      <MapContainer center={[47.6062, -122.3321]} zoom={10} className="project-map" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((point) => (
          <Marker
            key={point.slug}
            ref={(ref) => {
              if (ref) {
                markerRefs.current[point.slug] = ref;
              }
            }}
            position={[point.lat, point.lng]}
            icon={point.slug === selectedSlug ? selectedIcon : defaultIcon}
            eventHandlers={{
              click: () => onSelect(point.slug),
              mouseover: () => onSelect(point.slug),
            }}
          >
            <Popup>
              <div className="project-popup">
                <div className="project-popup-meta">{point.program} · {point.status}</div>
                <h6>{point.name}</h6>
                <p>{point.city}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        <FitBounds points={points} />
        <SelectedProjectFocus selectedSlug={selectedSlug} points={points} markerRefs={markerRefs} />
      </MapContainer>

      <div className="project-map-legend">
        <span><i className="pin-dot" /> Project location</span>
        <span><i className="pin-dot is-active" /> Selected</span>
      </div>

      {selectedSlug ? (
        <p className="selected-point-text">Selected project: {points.find((p) => p.slug === selectedSlug)?.name}</p>
      ) : null}
    </div>
  );
}

export default ProjectMap;
