import React from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div className="bg-white dark:bg-gray-800">
      {/* Container for the top section with image and content */}
      <div className="relative overflow-hidden mt-9 flex flex-col lg:flex-row lg:items-center">
        {/* Image section */}
        <div className="lg:w-1/2 flex-shrink-0">
          <img
            className="h-full w-full object-cover rounded-3xl"
            src="https://res.cloudinary.com/dragonspell/images/w_1440,h_864,c_fill,dpr_auto,fl_progressive:steep,f_auto/w_1440,h_864/v1661461692/www.travelportland.com/mktg-fr-20170914-trillium-lake-campsite-campers-night-fire-01/mktg-fr-20170914-trillium-lake-campsite-campers-night-fire-01.jpg"
            alt="Camping scene"
          />
        </div>

        {/* ENJOY section */}
        <div className="lg:w-1/2 flex items-center justify-center py-12 px-6 lg:px-12">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline dark:text-white">
                Enjoy Your
              </span>{" "}
              <span className="block text-emerald-600 xl:inline">
                Kamper Time
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Discover the best camping spots and gear rentals for your next
              outdoor adventure. Connect with nature and create unforgettable
              memories.
            </p>
            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/campsites"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10"
              >
                Browse Campsites
              </Link>
              <Link
                to="/campgears"
                className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 md:py-4 md:text-lg md:px-10"
              >
                Rent Camp Gears
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* What People Are Saying Section */}
      <div className="my-10 px-20 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
          What People Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="p-4 rounded-lg border border-emerald-600 shadow-lg dark:bg-gray-900">
            <div className="flex justify-center mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <p className="text-gray-700 dark:text-gray-200 ">
              "This website helped me find the perfect campsite for my family
              vacation. We had a blast!"
            </p>
            <span className="text-gray-500 dark:text-gray-400 text-sm block">
              - Kirigaya Kazuto
            </span>
          </div>
          <div className="p-4 rounded-lg border border-emerald-600 shadow-lg dark:bg-gray-900" >
            <div className="flex justify-center mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <p className="text-gray-700 dark:text-gray-200">
              "The rented gear was top-notch and made our camping trip much
              easier. Highly recommend!"
            </p>
            <span className="text-gray-500 dark:text-gray-400 text-sm block">
              - Asuna Yuuki
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
