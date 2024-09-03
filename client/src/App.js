import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./userContext";

import axios from "axios";
import Layout from "./pages/Layout";
import IndexPage from "./pages/IndexPage";
import CampsitesPage from "./pages/CampsitesPage";
import CampGearsPage from "./pages/CampGearsPage";

import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

import PlacePage from "./pages/PlacePage";
import PlacesFormPage from "./components/PlacesFormPage";
import PlacesPage from "./pages/PlacesPage";

import BookingPage from "./pages/BookingPage";
import BookingsPage from "./pages/BookingsPage";
import UpdateBookingPage from "./components/UpdateBookingPage";

import GearPage from "./pages/GearPage";
import GearsFormPage from "./components/GearsFormPage";
import GearsPage from "./pages/GearsPage";

import RentPage from "./pages/RentPage";
import RentsPage from "./pages/RentsPage";
import UpdateRentingPage from "./components/UpdateRentingPage";

import ReportPage from "./pages/ReportPage";
import ReportsFormPage from "./components/ReportsFormPage";
import ReportsPage from "./pages/ReportsPage";

import { ThemeProvider } from "../src/contexts/ThemeContext";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <ThemeProvider>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/campsites" element={<CampsitesPage />} />
            <Route path="/campgears" element={<CampGearsPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<ProfilePage />} />

            <Route path="/account/places" element={<PlacesPage />} />
            <Route path="/account/places/new" element={<PlacesFormPage />} />
            <Route path="/account/places/:id" element={<PlacesFormPage />} />
            <Route path="/place/:id" element={<PlacePage />} />

            <Route path="/account/bookings" element={<BookingsPage />} />
            <Route path="/account/bookings/:id" element={<BookingPage />} />
            <Route
              path="/account/bookings/update/:bookingId"
              element={<UpdateBookingPage />}
            />

            <Route path="/account/gears" element={<GearsPage />} />
            <Route path="/account/gears/new" element={<GearsFormPage />} />
            <Route path="/account/gears/:id" element={<GearsFormPage />} />
            <Route path="/gear/:id" element={<GearPage />} />

            <Route path="/account/reports" element={<ReportsPage />} />
            <Route path="/account/reports/new" element={<ReportsFormPage />} />
            <Route path="/account/reports/:id" element={<ReportsFormPage />} />
            <Route path="/report/:id" element={<ReportPage />} />

            <Route path="/account/rents" element={<RentsPage />} />
            <Route path="/account/rents/:id" element={<RentPage />} />
            <Route
              path="/account/rents/update/:rentingId"
              element={<UpdateRentingPage />}
            />
          </Route>
        </Routes>
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
