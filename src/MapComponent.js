import React, { useState, useEffect } from 'react';

function MapComponent() {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 15,
      });
      setMap(mapInstance);
    };

    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAff6ckm2xhbQYBRpW2XWh-QU3XNkBXLPQ&libraries=geometry,places`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    };

    loadScript();
  }, []);

  useEffect(() => {
    const updateLocation = (location) => {
      if (map) {
        map.setCenter(location);
        if (!currentLocation) {
          map.setZoom(15);
        }
        setCurrentLocation(location);
      }
    };

    // Obtencion datos
    const watchLocation = () => {
      const fakeLocationUpdates = [
        { lat: 40.712776, lng: -74.005974 }, 
        { lat: 34.052235, lng: -118.243683 }, 
        { lat: 51.507351, lng: -0.127758 }, 
      ];

      let index = 0;
      const intervalId = setInterval(() => {
        updateLocation(fakeLocationUpdates[index]);
        index = (index + 1) % fakeLocationUpdates.length;
      }, 5000);

      return () => clearInterval(intervalId);
    };

    watchLocation();
  }, [map, currentLocation]);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <div id="map" style={{ height: '100%' }}></div>
    </div>
  );
}

export default MapComponent;
