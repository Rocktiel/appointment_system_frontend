"use client";
import React, { useState, useEffect } from "react";
import { cityData } from "@/lib/cities_districts";

interface Props {
  onChange: (city: string, county: string) => void;
}

const CityCountySelector: React.FC<Props> = ({ onChange }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [counties, setCounties] = useState<string[]>([]);

  useEffect(() => {
    console.log("Selected City:", selectedCity);
    console.log("Selected County:", selectedCounty);
    console.log("Counties:", counties);
    if (selectedCity) {
      const city = cityData.find((c) => c.name === selectedCity);
      setCounties(city?.counties || []);
      setSelectedCounty("");
    } else {
      setCounties([]);
    }
  }, [selectedCity]);

  // Seçim değiştiğinde parent'a bildir
  useEffect(() => {
    console.log("Selected City:", selectedCity);
    console.log("Selected County:", selectedCounty);
    console.log("Counties:", counties);
    onChange(selectedCity, selectedCounty);
  }, [selectedCity, selectedCounty]);
  console.log("Selected City:", selectedCity);
  console.log("Selected County:", selectedCounty);
  console.log("Counties:", counties);
  return (
    <div className="space-y-4">
      {/* İl seçimi */}
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="border p-2 rounded w-full cursor-pointer"
      >
        <option value="">İl seçin</option>
        {cityData.map((city) => (
          <option key={city.plate} value={city.name}>
            {city.name.toUpperCase()}
          </option>
        ))}
      </select>

      {/* İlçe seçimi */}
      <select
        value={selectedCounty}
        onChange={(e) => setSelectedCounty(e.target.value)}
        className="border p-2 rounded w-full  cursor-pointer"
        disabled={!selectedCity}
      >
        <option value="">İlçe seçin</option>
        {counties.map((county, idx) => (
          <option key={idx} value={county}>
            {county.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityCountySelector;
