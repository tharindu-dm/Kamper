import { useContext, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext"; // Path will be updated
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";

export default function RentingWidget({ gear }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberofItems, setNumberOfItems] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [error, setError] = useState(""); // State for error messages
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
    numberOfNights > 0 ? numberOfNights * gear.price : gear.price;

  // Validation function
  const validateInputs = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (!checkIn || new Date(checkIn) < tomorrow) {
      setError("Check-in date must be from tomorrow onwards.");
      alert("Check-in date must be from tomorrow onwards."); // Alert for invalid check-in date
      return false;
    }

    if (!checkOut || new Date(checkOut) <= new Date(checkIn)) {
      setError("Check-out date must be after the check-in date.");
      alert("Check-out date must be after the check-in date."); // Alert for invalid check-out date
      return false;
    }

    if (numberofItems <= 0) {
      setError("Number of items must be at least 1.");
      alert("Number of items must be at least 1."); // Alert for invalid number of items
      return false;
    }

    if (numberofItems > gear.capacity) {
      setError(`Number of items cannot exceed ${gear.capacity}.`);
      alert(`Number of items cannot exceed ${gear.capacity}.`); // Alert for exceeding capacity
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      alert("Phone number must be exactly 10 digits."); // Alert for invalid phone number
      return false;
    }

    setError(""); // Clear error if all validations pass
    return true;
  };

  async function rentThisItem() {
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.post("/api/rentings", {
        checkIn,
        checkOut,
        numberofItems,
        name,
        phone,
        gear: gear._id,
        price: totalPrice,
      });
      const rentingId = response.data._id;
      setRedirect(`/account/rents/${rentingId}`);
    } catch (err) {
      console.error("Error renting the item:", err);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${gear.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>From:</label>
            <input
              className="dark:text-black ml-2 rounded-lg"
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>To:</label>
            <input
              className="dark:text-black ml-2 rounded-lg"
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of Items:</label>
          <input
            className="dark:text-black"
            type="number"
            value={numberofItems}
            onChange={(ev) => setNumberOfItems(parseInt(ev.target.value))}
            min={1}
            max={gear.capacity}
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
      <button onClick={rentThisItem} className="primary mt-4">
        Rent This Item
        {numberOfNights > 0 && <span> ${numberOfNights * gear.price}</span>}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
