import React from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden mt-9">
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 px-4 sm:mt-12 sm:px-6 lg:px-8">
          <img
            className="rounded-3xl h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://res.cloudinary.com/dragonspell/images/w_1440,h_864,c_fill,dpr_auto,fl_progressive:steep,f_auto/w_1440,h_864/v1661461692/www.travelportland.com/mktg-fr-20170914-trillium-lake-campsite-campers-night-fire-01/mktg-fr-20170914-trillium-lake-campsite-campers-night-fire-01.jpg"
            alt="Camping scene"
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Enjoy Your</span>{" "}
                  <span className="block text-emerald-600 xl:inline">
                    Kamper Time
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover the best camping spots and gear rentals for your next
                  outdoor adventure. Connect with nature and create
                  unforgettable memories.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/campsites"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10"
                    >
                      Browse Campsites
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/campgears"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 md:py-4 md:text-lg md:px-10"
                    >
                      Rent Camp Gears
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
