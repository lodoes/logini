// components/LeafletMap.js
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import ResidenceCard from './ResidenceCard';

// Fix pour les icônes Leaflet avec Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Coordonnées des stations principales de la ligne RER A
const rerAStations = [
  [48.955402244531115, 2.093521901580612], // Achères-Grand-Cormier
  [48.86182227279812, 2.3470126872387564], // Châtelet-Les Halles
  // ... autres stations ...
];

// Fonction pour calculer la distance entre deux points (latitude, longitude)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // Distance en mètres
}

const LeafletMap = ({ residences }) => {
  const [showRERStations, setShowRERStations] = useState(false); // Activer/désactiver les stations RER

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[48.844266, 2.374499]} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marqueurs pour les résidences avec Popup contenant ResidenceCard */}
        {residences.map((residence) => (
          <Marker key={residence.id} position={[residence.latitude, residence.longitude]}>
            <Popup>
              <ResidenceCard residence={residence} />
            </Popup>
          </Marker>
        ))}

        {/* Marqueurs pour les stations RER A en rouge, si activé */}
        {showRERStations &&
          rerAStations.map(([lat, lon], index) => (
            <Marker
              key={index}
              position={[lat, lon]}
              icon={new L.Icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-red.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              })}
            >
              <Popup>Station RER A</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
