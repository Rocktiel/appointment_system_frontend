"use client";

import React, { useEffect, useRef, useState } from "react";

interface MapSelectorProps {
  onLocationSelect: (lat: number, lng: number) => void;
  defaultLocation?: { lat: number; lng: number };
}

const MapSelector: React.FC<MapSelectorProps> = ({
  onLocationSelect,
  // Eğer defaultLocation dışarıdan gelmezse kullanılacak varsayılan değer
  defaultLocation = { lat: 41.0082, lng: 28.9784 }, // İstanbul için daha doğru bir varsayılan konum
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // Marker'ı doğrudan useRef ile saklamak daha temiz olabilir,
  // böylece state güncelleme döngüsüne girmez.
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  // Google Maps AdvancedMarkerElement'in yüklenmesini bekle
  const waitForAdvancedMarker = (callback: () => void) => {
    if (window.google?.maps?.marker?.AdvancedMarkerElement) {
      callback();
    } else {
      setTimeout(() => waitForAdvancedMarker(callback), 200);
    }
  };

  // Google Maps Script'i ve haritayı ilk kez yükle
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_Maps_API_KEY}&v=weekly&libraries=marker`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        waitForAdvancedMarker(initMap);
      };

      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current) return;

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: defaultLocation, // İlk başlatmada gelen defaultLocation
        zoom: 13,
        mapId: "DEMO_MAP_ID", // Kendi Map ID'nizi kullanın
      });
      setMap(mapInstance);

      const initialMarker = new google.maps.marker.AdvancedMarkerElement({
        position: defaultLocation,
        map: mapInstance,
        title: "Seçilen konum",
      });
      markerRef.current = initialMarker; // Marker'ı ref'e kaydet

      // Haritada tıklanma olay dinleyicisi
      mapInstance.addListener("click", (e: google.maps.MapMouseEvent) => {
        const clickedLat = e.latLng?.lat();
        const clickedLng = e.latLng?.lng();

        if (!clickedLat || !clickedLng) return;

        // Önceki marker'ı kaldır (varsa)
        if (markerRef.current) {
          markerRef.current.map = null; // Marker'ı haritadan kaldır
          markerRef.current = null;
        }

        const newMarker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: clickedLat, lng: clickedLng },
          map: mapInstance,
          title: "Seçilen konum",
        });
        markerRef.current = newMarker; // Yeni marker'ı ref'e kaydet

        onLocationSelect(clickedLat, clickedLng);
      });
    };

    if (!window.google?.maps) {
      loadScript();
    } else {
      // Eğer script zaten yüklüyse, doğrudan haritayı başlatmaya bekle
      waitForAdvancedMarker(initMap);
    }
  }, []); // Bu useEffect sadece bir kez çalışmalı (componentDidMount gibi)

  // defaultLocation prop'u değiştiğinde harita ve marker'ı güncelle
  useEffect(() => {
    if (map && markerRef.current && defaultLocation) {
      // Haritanın merkezini güncelle
      map.setCenter(defaultLocation);

      // Marker'ın konumunu güncelle
      markerRef.current.position = defaultLocation; // AdvancedMarkerElement için pozisyonu doğrudan ayarlayın
      // Eğer eski marker hala haritadaysa ve yeni pozisyona taşınamıyorsa
      // eskiyi kaldırıp yenisini eklemek daha güvenli olabilir.
      // Ancak genellikle position güncelleme yeterlidir.
    }
  }, [defaultLocation, map]); // defaultLocation veya map değiştiğinde çalışır

  return (
    <div>
      <p className="mb-2 text-sm">Konumu seçmek için haritaya tıklayın:</p>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default MapSelector;
