import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <Header />
      <div className="py-4 px-8 flex flex-col min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white pt-20">
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
