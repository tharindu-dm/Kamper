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
    <div className="bg-emerald-50 dark:bg-gray-700 rounded-2xl mt-4 mx-8 px-8 pt-8">
      <h1 className="text-4xl font-bold mb-5">{gear.type}</h1>
      <GearGallery gear={gear} />

      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {gear.description}
          </div>
          <div className="grid grid-flow-row">
            <div className="grid grid-flow-col gap-8">
              <div className="border bg-primary text-white p-2 rounded-xl text-center flex-col w-auto">
                <h2 className="text-xl mb-2">Max Capacity</h2>
                <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-b-lg font-bold text-2xl">
                  {gear.capacity}
                </div>
              </div>
            </div>
            <div className="mt-3 p-3 border-primary dark:border-emerald-600 border rounded-2xl w-full">
              <div className="">
                <h2 className="font-semibold  text-2xl">Other details</h2>
              </div>
              <div className="mb-4 mt-2 text-md dark:text-gray-200 text-gray-700 leading-5 ">
                {gear.extraInfo}
              </div>
            </div>
            <div className="mt-3 mb-3 p-3 border-primary dark:border-emerald-600 border rounded-2xl w-full">
              <div className="">
                <h2 className="font-semibold text-2xl">Categories</h2>
              </div>
              <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                <div className="grid grid-flow-col gap-6">
                  {gear.searchCriteria.map((sc, index) => (
                    <div
                      key={index}
                      className="flex rounded-xl border-emerald-900 dark:border-emerald-600 dark:text-gray-200 border-2 justify-center font-semibold text-lg p-1"
                    >
                      {sc.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <RentingWidget gear={gear} />
        </div>
      </div>
    </div>
  );
}
