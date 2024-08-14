import React, { useEffect, useState } from "react";
import axios from "axios";
export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/api/place").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-6 gap-y-8 grid-cols-4 md:grid-cols-3 lg:grid-cols-6">
      {places.length > 0 &&
        places.map((place) => (
          <div>
            <div className="bg-gray-500 rounded-2xl flex ">
              {places.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/ " + place.photos?.[0]}
                  alt={place.title}
                />
              )}
            </div>
            <h2 className="text-sm truncate">{place.title}</h2>
            <h3 className="text-sm font-bold">{place.address}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span>/night
            </div>
          </div>
        ))}
    </div>
  );
}
