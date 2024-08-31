import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

export default function IndexPage() {
  const [gears, setGears] = useState([]);
  useEffect(() => {
    axios.get("/api/gear").then((response) => {
      setGears(response.data);
    });
  }, []);

  return (
    <>
    <div className="mt-8 grid gap-6 gap-y-8 grid-cols-4 md:grid-cols-3 lg:grid-cols-6">

    </div>
    <div className="mt-8 grid gap-6 gap-y-8 grid-cols-4 md:grid-cols-3 lg:grid-cols-6">
      {gears.length > 0 &&
        gears.map((gear) => (
          <Link
            key={gear._id}
            to={"/gear/" + gear._id}
            className=""
          >
            <div>
              <div className="bg-gray-500 rounded-2xl flex">
                {gear.photos && gear.photos.length > 0 && (
                  <img
                    className="w-full h-full rounded-2xl object-cover aspect-square"
                    src={"http://localhost:4000/uploads/" + gear.photos[0]}
                    alt={gear.title}
                  />
                )}
              </div>
              <h2 className="text-sm truncate">{gear.type}</h2>
              <div className="mt-1">
                <span className="font-bold">${gear.price}</span>/night
              </div>
            </div>
          </Link>
        ))}
    </div>
    </>
  );
}
