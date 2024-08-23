import { Route, Routes } from "react-router-dom";

import BookingPage from "./pages/BookingPage";
import BookingsPage from "./pages/BookingsPage";
import IndexPage from "./pages/IndexPage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import PlacePage from "./pages/PlacePage";
import PlacesFormPage from "./components/PlacesFormPage";
import PlacesPage from "./pages/PlacesPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./userContext";
import axios from "axios";
import GearsPage from "./pages/GearsPage";
import GearsFormPage from "./components/GearsFormPage";
import RentsPage from "./pages/RentsPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />

          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
  
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />

          <Route path="/account/gears" element={<GearsPage />} />
          <Route path="/account/gears/new" element={<GearsFormPage />} />
          <Route path="/account/gears/:id" element={<GearsFormPage />} />

          <Route path="/account/rents" element={<RentsPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;

/**
 * Make These changes in App.js
 * 
 * inside <Routes>
 * <Route path="/account/:subpage/:action" element={<PlacesPage/>}></Route>
 */