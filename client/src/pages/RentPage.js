import { useEffect, useState } from "react";

import BookingDates from "../components/BookingDates";
import GearGallery from "../components/GearGallery";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function RentPage() {
  const { id } = useParams();
  const [rent, setRenting] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/api/rentings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setRenting(foundBooking);
        }
      });
    }
  }, [id]);

  if (!rent) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{rent.gear.type}</h1>
      <div className="bg-gray-200 dark:bg-gray-700 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your renting information:</h2>
          <BookingDates booking={rent} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${rent.price}</div>
        </div>
      </div>
      <GearGallery gear={rent.gear} />
    </div>
  );
}
