"use client";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { properties } from "../data/properties";
import PropertyCard from "./PropertyCard";

const containerStyle = {
  width: "100%",
  height: "100vh"
};
const center = {
  lat: 41.648,
  lng: -72.592
};

export default function Map() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleMarkerClick = property => {
    setSelectedProperty(property);
  };

  return (
    <div className="flex h-screen">
      {/* Property listing sidebar */}
      <div className="w-1/3 h-screen overflow-y-auto p-4 bg-white shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Available Properties</h2>
        {properties.map(property =>
          <PropertyCard
            key={property.id}
            property={property}
            onClick={handleMarkerClick}
          />
        )}
      </div>

      {/* Map */}
      <div className="w-2/3">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            mapId="53e611c27dfc73de722773de"
            center={center}
            zoom={14}
          >
            {properties.map(property =>
              <Marker
                key={property.id}
                position={property.position}
                onClick={() => handleMarkerClick(property)}
              />
            )}

            {selectedProperty &&
              <InfoWindow
                position={selectedProperty.position}
                onCloseClick={() => setSelectedProperty(null)}
              >
                <div className="p-2 max-w-xs">
                  <h3 className="font-semibold">
                    {selectedProperty.title}
                  </h3>
                  <p className="text-green-600 font-bold">
                    ${selectedProperty.price.toLocaleString()}
                  </p>
                  <p className="text-sm">
                    {selectedProperty.address}
                  </p>
                </div>
              </InfoWindow>}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

// export default function Map() {
//   const mapRef = useRef(null);

//   const map = new google.maps.Map(mapRef.current, {
//     center: { lat: 41.648, lng: -72.592 },
//     zoom: 10,
//     mapId: "53e611c27dfc73de722773de"
//   });

//   return <div ref={mapRef} />;
// }

// import { useEffect, useRef } from "react";

// const Map = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const loadMap = () => {
//       if (typeof window !== "undefined") {
//         // Check if google is already defined. If so, initialize the map.
//         if (window.google && window.google.maps) {
//           initMap();
//         } else {
//           // Load the Google Maps script dynamically
//           const script = document.createElement("script");
//           script.src = `https://maps.googleapis.com/maps/api/js?key=${process
//             .env
//             .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`; // Replace with your API key
//           script.async = true;
//           script.defer = true;
//           window.initMap = initMap; // Make initMap available globally
//           document.head.appendChild(script);
//         }
//       }
//     };

//     const initMap = () => {
//       const map = new google.maps.Map(mapRef.current, {
//         center: { lat: 34.0522, lng: -118.2437 },
//         zoom: 8,
//         mapId: "53e611c27dfc73de722773de"
//       });
//     };

//     loadMap();
//   }, []);

//   return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
// };

// export default Map;
