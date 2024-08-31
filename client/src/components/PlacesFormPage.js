import { useEffect, useState } from "react";
import Perk from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import AccountNavi from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  const [checkInError, setCheckInError] = useState(false);
  const [checkOutError, setCheckOutError] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/account/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-sm text-gray-500">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(header)}
      </>
    );
  }

  //VALIDATIONS
  const handleMaxGuestsChange = (event) => {
    const newMaxGuests = parseInt(event.target.value, 10);
    setMaxGuests(Math.max(1, newMaxGuests)); // Ensure at least 1 guest
  };

  const handlePriceChange = (event) => {
    const newPrice = parseFloat(event.target.value, 10);
    setPrice(Math.max(0, newPrice)); // Ensure non-negative value
  };

  const validateTime = (time) => {
    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    return timeRegex.test(time);
  };

  const handleCheckInChange = (event) => {
    const value = event.target.value;
    setCheckIn(value);
    setCheckInError(!validateTime(value) && value !== "");
  };

  const handleCheckOutChange = (event) => {
    const value = event.target.value;
    setCheckOut(value);
    setCheckOutError(!validateTime(value) && value !== "");
  };

  async function saveCampsite(ev) {
    ev.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    try {
      if (id) {
        await axios.put("/account/places", {
          id,
          ...placeData,
        });
      } else {
        await axios.post("/account/places", placeData);
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving place:", error);
      alert("Failed to save place. Please try again.");
    }
  }

  async function deletePlace(ev) {
    ev.preventDefault();

    if (window.confirm("Are you sure you want to delete this place?")) {
      try {
        await axios.delete("/account/places/" + id);
        setRedirect(true);
      } catch (error) {
        console.error("Error deleting place:", error);
        alert("Failed to delete place. Please try again.");
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNavi />
      <form className="px-40" onSubmit={saveCampsite}>
        {preInput(
          "Title",
          "title for your campsite, should be short and catchy as in advertisement"
        )}
        <input
          required
          type="text"
          placeholder="title, eg: my lovely campsite"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        {preInput("Address", "Address to your campsite")}
        <input
          required
          type="text"
          placeholder="addresss, eg: Colombo, Western Province, Sri Lanka"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />

        {preInput("Photos", "more the better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Description of the campsite")}
        <textarea
          required
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        {preInput("Perks", "Select all the perks of your place")}
        <Perk selected={perks} onChange={setPerks} />

        {preInput(
          "Extra info.",
          "ground rules and Extra information about the place"
        )}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />

        {preInput(
          "Check in&out times",
          "Add check in and check out times. make sure to keep a window between cleaning activities"
        )}
        <div className="grid gap-2 sm:grid-col-2 md:grid-cols-4">
        <div>
        <h3 className="mt-2 mb-1">Check in time</h3>
        <input
          required
          type="text"
          value={checkIn}
          onChange={handleCheckInChange}
          onBlur={() => setCheckInError(!validateTime(checkIn) && checkIn !== '')}
          className={checkInError ? 'border-red-500' : ''}
        />
        {checkInError && (
          <p className="text-red-600">Please enter time in HH:MM format</p>
        )}
      </div>

      <div>
        <h3 className="mt-2 mb-1">Check out time</h3>
        <input
          required
          type="text"
          value={checkOut}
          onChange={handleCheckOutChange}
          onBlur={() => setCheckOutError(!validateTime(checkOut) && checkOut !== '')}
          className={checkOutError ? 'border-red-500' : ''}
        />
        {checkOutError && (
          <p className="text-red-600">Please enter time in HH:MM format</p>
        )}
      </div>

          <div>
            <h3 className="mt-2 mb-1">Max no. of guests</h3>
            <input
              required
              type="number"
              value={maxGuests}
              onChange={handleMaxGuestsChange}
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Price per night</h3>
            <input
              required
              type="number"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="rounded-2xl text-white  bg-red-500 mt-4"
            onClick={deletePlace}
          >
            Delete Place
          </button>
          <button className="primary mt-4">Save</button>
        </div>
      </form>
    </div>
  );
}
