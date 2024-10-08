import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

export default function Footer() {
  const { user } = useContext(UserContext);

  return (
    <footer className="bg-emerald-900 w-full">
      <div className="flex flex-col justify-between items-center max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div className="mb-6 md:mb-0">
            <Link to={"/"} className="flex items-center gap-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 512 512"
                fill="currentColor"
                role="img"
                className="text-emerald-500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m361.155 91.245l-18 .193l.42 38.98c-45.773 13.285-108.533 19.738-166.474 23.573c35.097 96.284 99.357 173.77 157.845 257.13c20.718-19.655 51.11-31.983 83.46-36.01c-20.8-18.109-36.634-27.966-58.833-70.438c31.27 37.085 52.579 48.467 77.623 62.006c3.263-13.094 8.938-24.638 18.721-32.674c8.667-7.12 20.026-10.654 33.53-10.344c-46.874-59.763-101.67-117.054-127.83-189.435l-.462-42.98zM163.25 102.92l-17.998.244s.25 18.34.56 36.97c.156 9.316.325 18.703.489 25.929c.06 2.636.117 4.58.174 6.542c-34.378 83.733-69.154 160.993-123.92 233.442c33.635-1.387 66.326-1.203 98.552-.041C143.37 343.389 144.453 271.151 156.734 204c11.417 68.562 10.566 139.445 33.483 205.83c42.962 3.082 85.69 7.198 129.35 10.926c-55.67-79.151-118.213-155.037-155.118-249.365c-.05-1.782-.1-3.396-.152-5.737c-.162-7.156-.333-16.523-.488-25.82c-.31-18.594-.559-36.914-.559-36.914z" />
              </svg>
              <span className="font-bold text-xl text-white">Kamper</span>
            </Link>
          </div>
          <nav className="mb-6 md:mb-0">
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <Link
                  to={"/"}
                  className="hover:text-emerald-500 transition-colors text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/campsites"}
                  className="hover:text-emerald-500 transition-colors text-white"
                >
                  Browse Campsites
                </Link>
              </li>
              <li>
                <Link
                  to={"/campgears"}
                  className="hover:text-emerald-500 transition-colors text-white"
                >
                  Rent Camp Gears
                </Link>
              </li>
              <li>
                <Link
                  to={user ? "/account" : "/login"}
                  className="hover:text-emerald-500 transition-colors text-white"
                >
                  {user ? "My Account" : "Login"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400 w-full">
          © {new Date().getFullYear()} Kamper. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
