import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { response } = await axios.post("/api/auth/signin", formData);
      console.log("Response data:", response);
      navigateTo("/");
      // Handle a successful response here if needed
    } catch (error) {
      console.error("Error:", error);
      // Set the error state to the error message
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg "
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg "
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 "
        >
          {loading ? "loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={`/sign-up`}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
