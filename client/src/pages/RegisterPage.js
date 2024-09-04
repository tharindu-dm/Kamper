import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="flex w-full max-w-4xl bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden min-h-[450px]">
        {/* Left Side - Text Section */}
        <div className="hidden md:flex md:w-1/2 bg-emerald-600 items-center justify-center p-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
            Join Us Today! <br />
            Start Your Adventure
          </h2>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex flex-col w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
            Register
          </h1>
          <form className="space-y-4" onSubmit={registerUser}>
            <div className="relative">
              <input
                type="text"
                placeholder="John Simpson"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className="dark:text-black w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-400"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="dark:text-black w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-400"
              />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="dark:text-black w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-400"
              />
            </div>
            <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 focus:outline-none">
              Register
            </button>
            <div className="text-center py-2 text-gray-500 dark:text-gray-400">
              Already a member?{" "}
              <Link
                className="underline text-emerald-600 dark:text-emerald-400"
                to={"/login"}
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
