import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../userContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/api/login", { email, password });
      setUser(data);
      //alert("Login successful");
      setRedirect(true);
    } catch (e) {
      if (e.response && e.response.status === 401) {
        alert(e.response.data.error);
      } else {
        alert("An error occurred during login");
      }
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  // Login Component
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="flex w-full max-w-4xl bg-white dark:bg-gray-700 shadow-lg rounded-lg  min-h-[450px]">
        {/* Left Side - Form Section */}
        <div className="flex flex-col w-full md:w-1/2 p-8 ">
          <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
            Login
          </h1>
          <form className="mt-3 space-y-4" onSubmit={handleLoginSubmit}>
            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="w-full px-4 py-2 border dark:text-black border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-400"
              />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="w-full px-4 py-2 border dark:text-black border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-400"
              />
            </div>
            <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 focus:outline-none">
              Login
            </button>
            <div className="text-center py-2 text-gray-500 dark:text-gray-400">
              Don't have an account yet?{" "}
              <Link
                className="underline text-emerald-600 dark:text-emerald-400"
                to={"/register"}
              >
                Register now
              </Link>
            </div>
          </form>
        </div>

        {/* Right Side - Welcoming Text Section */}
        <div className="hidden md:flex md:w-1/2 bg-emerald-600 items-center justify-center p-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
            Welcome Back! <br /> <br />
            Time For The Next Adventure
          </h2>
        </div>
      </div>
    </div>
  );
}
