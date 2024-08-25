import { useEffect, useState } from "react";


import RentingWidget from "../RentingWidget";
import GearGallery from "../components/GearGallery";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function GearPage() {
  const { id } = useParams();
  const [gear, setGear] = useState(null);
  
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/gears/${id}`).then((response) => {
      setGear(response.data);
    });
  }, [id]);

  if (!gear) {
    return "";
  }

  

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{gear.type}</h1>
      
      <GearGallery gear={gear} />

      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {gear.description}
          </div>
          Max Capacity: {gear.capacity}
        </div>
        <div>
          <RentingWidget gear={gear} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {gear.extraInfo}
        </div>
      </div>
    </div>
  );
}
