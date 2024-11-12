// components/LeafletMap.js
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ResidenceCard from './ResidenceCard';

// Fix for Leaflet icons with Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

/*
// Uncomment and use if needed in the future
const rerAStations = [
  [48.955402244531115, 2.093521901580612], // Achères-Grand-Cormier
  [48.86182227279812, 2.3470126872387564], // Châtelet-Les Halles
  // ... other stations ...
];
*/

const LeafletMap = ({ residences }) => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[48.844266, 2.374499]} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Markers for residences with Popup containing ResidenceCard */}
        {residences.map((residence) => (
          <Marker key={residence.id} position={[residence.latitude, residence.longitude]}>
            <Popup>
              <ResidenceCard residence={residence} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
