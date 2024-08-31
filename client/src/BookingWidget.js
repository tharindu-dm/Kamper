import { useContext, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext"; /* path will be updated */
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [error, setError] = useState("");  // State for error messages
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const totalPrice =
    numberOfNights > 0 ? numberOfNights * place.price : place.price;

  // Function to validate inputs
  function validateInputs() {
    const today = new Date();
    const selectedCheckIn = new Date(checkIn);
    const selectedCheckOut = new Date(checkOut);

    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates.");
      return false;
    }

    if (selectedCheckIn <= today) {
      setError("Check-in date must be a future date.");
      return false;
    }

    if (selectedCheckOut <= today) {
      setError("Check-in date must be a future date.");
      return false;
    }

    if (numberOfNights <= 0) {
      setError("Check-out date must be after the check-in date.");
      return false;
    }

    if (numberOfGuests <= 0) {
      setError("Number of guests must be at least 1.");
      return false;
    }

    if (numberOfGuests > place.maxGuests) {
      setError(`Number of guests cannot exceed ${place.maxGuests}.`);
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return false;
    }

    setError(""); // Clear error if all validations pass
    return true;
  }

  async function bookThisPlace() {
    if (!validateInputs()) {
      alert("Invalid Inputs!!! \nClick 'OK' to show the error"); // Display the error and stop the booking process
      return;
    }

    try {
      const response = await axios.post("/api/bookings", {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: place._id,
        price: totalPrice,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      setError("Failed to book the place. Please try again later.");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check-in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check-out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              min={checkIn} // Check-out cannot be before check-in
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(parseInt(ev.target.value))}
            min={1} // Prevent less than 1 guest
            max={place.maxGuests} // Prevent more than maxGuests
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              maxLength={10}
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
}
