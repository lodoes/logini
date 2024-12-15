import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ResidenceCard from './ResidenceCardmini';
import styles from '../styles/Map.module.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/icons/marker-icon-2x.png',
  iconUrl: '/icons/marker-icon.png',
  shadowUrl: '/icons/marker-shadow.png',
});

// Fonction pour calculer la distance entre deux points (latitude et longitude)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const LeafletMap = ({ residences }) => {
  const [stationsData, setStationsData] = useState({});
  const [selectedTransport, setSelectedTransport] = useState('RER');
  const [selectedLine, setSelectedLine] = useState(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [distanceFilter, setDistanceFilter] = useState(2);
  const [showFilters, setShowFilters] = useState(true); // État pour afficher/cacher les filtres

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const response = await fetch('/data/stations.json');
        const data = await response.json();
        setStationsData(data);
      } catch (error) {
        console.error('Error fetching stations data:', error);
      }
    };
    fetchStationsData();
  }, []);

  const lines = stationsData[selectedTransport] || {};
  const stations = selectedLine ? lines[selectedLine] || [] : [];

  const filteredResidences = residences.filter((residence) => {
    const passesAvailabilityFilter = !showAvailableOnly || residence.disponibilite === 'Disponible';

    const isNearStation = stations.some((station) => {
      const distance = calculateDistance(
        residence.latitude,
        residence.longitude,
        station.latitude,
        station.longitude
      );
      return distance <= distanceFilter;
    });

    return passesAvailabilityFilter && (selectedLine ? isNearStation : true);
  });

  return (
    <div className={`${styles.container} ${!showFilters ? styles.fullWidth : ''}`}>
      {showFilters && (
        <div className={styles.sidebar}>

          {/* Toggle modernisé pour "Disponibilité uniquement" */}
          <div className={styles.filterRow}>
            <label className={styles.toggleContainer}>
              <span>{showAvailableOnly ? 'Disponibles uniquement' : 'Disponibles uniquement'}</span>
              <input
                type="checkbox"
                checked={showAvailableOnly}
                onChange={() => setShowAvailableOnly(!showAvailableOnly)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
          <h4>Je veux une résidence à :</h4>

          {/* Slider moderne pour la distance */}
          <div className={styles.filterRow}>
            <h5>Distance maximale (en km)</h5>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(parseFloat(e.target.value))}
              className={styles.slider}
            />
            <span className={styles.sliderValue}>{distanceFilter.toFixed(1)} km</span>
          </div>

          {/* Sélection du type de transport */}
          <div className={styles.filterRow}>
            <h5>Type de transport</h5>
            <select
              value={selectedTransport}
              onChange={(e) => {
                setSelectedTransport(e.target.value);
                setSelectedLine(null);
              }}
              className={styles.select}
            >
              {Object.keys(stationsData).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Sélection de la ligne */}
          {lines && (
            <div className={styles.filterRow}>
              <h5>Ligne</h5>
              <select
                value={selectedLine || ''}
                onChange={(e) => setSelectedLine(e.target.value)}
                className={styles.select}
              >
                <option value="">Toutes les lignes</option>
                {Object.keys(lines).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            className={styles.searchButton}
            onClick={() => console.log('Recherche déclenchée avec les filtres')}
          >
            Chercher
          </button>

          

          
        </div>
      )}

      <div className={styles.map}>
        <button
          className={styles.toggleFiltersButton}
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Cacher les filtres' : 'Filtres'}
        </button>

        <MapContainer center={[48.8066, 2.3522]} zoom={10} style={{ height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {filteredResidences.map((residence) => (
            <Marker
              key={residence.id}
              position={[residence.latitude, residence.longitude]}
              icon={
                residence.disponibilite === 'Disponible'
                  ? new L.Icon({ iconUrl: '/icons/marker-icon-2x-green.png', iconSize: [25, 41] })
                  : residence.disponibilite === 'Non disponible'
                    ? new L.Icon({ iconUrl: '/icons/marker-icon-2x-red.png', iconSize: [25, 41] })
                    : residence.disponibilite === 'Bientôt Disponible'
                      ? new L.Icon({ iconUrl: '/icons/marker-icon-2x-gold.png', iconSize: [25, 41] })
                      : new L.Icon({ iconUrl: '/icons/marker-icon-2x-grey.png', iconSize: [25, 41] })
              }
            >
              <Popup>
                <ResidenceCard residence={residence} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default LeafletMap;
