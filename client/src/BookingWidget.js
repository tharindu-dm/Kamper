import { useContext, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext"; /* path will be updated */
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1); // State for number of guests
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // State for phone number
  const [redirect, setRedirect] = useState(""); // State for redirecting to booking page
  const [error, setError] = useState(""); // State for error messages
  const { user } = useContext(UserContext); /* path will be updated */

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  // Calculate the number of nights
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  
  // Calculate the total price
  const totalPrice =
    numberOfNights > 0 ? numberOfNights * place.price : place.price;

  // Function to validate inputs
  function validateInputs() {
    const today = new Date();
    const selectedCheckIn = new Date(checkIn); // Convert check-in to a Date object
    const selectedCheckOut = new Date(checkOut); // Convert check-out to a Date object

    // Check if check-in and check-out dates are selected
    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates.");
      alert("Please select both check-in and check-out dates.");
      return false;
    }

    // Check if check-in date is before check-out date
    if (selectedCheckIn <= today) {
      setError("Check-in date must be a future date.");
      alert("Check-in date must be a future date.");
      return false;
    }

    // Check if check-out date is after check-in date
    if (selectedCheckOut <= today) {
      setError("Check-in date must be a future date.");
      alert("Check-in date must be a future date.");
      return false;
    }

    // numberOfNights will be 0 if check-in and check-out dates are not selected
    if (numberOfNights <= 0) {
      setError("Check-out date must be after the check-in date.");
      alert("Check-out date must be after the check-in date.");
      return false;
    }

    if (numberOfGuests <= 0) {
      setError("Number of guests must be at least 1.");
      alert("Number of guests must be at least 1.");
      return false;
    }

    if (numberOfGuests > place.maxGuests) {
      setError(`Number of guests cannot exceed ${place.maxGuests}.`);
      alert(`Number of guests cannot exceed ${place.maxGuests}.`);
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      alert("Phone number must be exactly 10 digits.");
      return false;
    }

    setError(""); // Clear error if all validations pass
    return true;
  }

  async function bookThisPlace() {
    if (!validateInputs()) {
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
    <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check-in:</label>
            <input
              className="dark:text-black ml-2 rounded-lg"
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check-out:</label>
            <input
              className="dark:text-black ml-2 rounded-lg"
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
            className="dark:text-black"
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
              className="dark:text-black"
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              className="dark:text-black"
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
