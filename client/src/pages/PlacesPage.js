import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
  const { action } = useParams();
  return (
    <div>
      {action !== "new" && (
        <div className="">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form>
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-sm text-gray-500">
              title for your place, should be short and catchy as in
              advertisement
            </p>
            <input type="text" placeholder="title, eg: my lovely apartment" />

            <h2 className="text-2xl mt-4">address</h2>
            <p className="text-sm text-gray-500">Address to your place</p>
            <input
              type="text"
              placeholder="addresss, eg: Barcelona, Philadelphia"
            />

            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-sm text-gray-500">more the better</p>
            <div className="flex gap-2">
              <input type="text" placeholder={"Add using a link....jpg"} />
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-gray-600">
                Upload from your device
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
