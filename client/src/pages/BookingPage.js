import { useEffect, useState } from "react";

import AddressLink from "../components/AddressLink";
import BookingDates from "../components/BookingDates";
import PlaceGallery from "../components/PlaceGallery";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BookingPage() {
  const { id } = useParams(); // Get the booking ID from the URL
  const [booking, setBooking] = useState(null); // Initialize the booking state
  useEffect(() => {
    if (id) {
      axios.get("/api/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id); // Find the booking with the matching ID
        if (foundBooking) {
          setBooking(foundBooking); // Set the booking state to the found booking
        }
      });
    }
  }, [id]);

  if (!booking) {
    return ""; // Return an empty string if the booking is not found
  }

  return (
    <div className="my-8 ">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 dark:bg-gray-700 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
