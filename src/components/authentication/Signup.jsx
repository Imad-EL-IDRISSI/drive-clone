import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { DiGoogleDrive } from "react-icons/di";
import { FaFacebookSquare } from "react-icons/fa";


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { googleSignIn, facebookSignIn } = useUserAuth();
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleFacebookSignIn = async (e) => {
    e.preventDefault();
    try {
      await facebookSignIn();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center gap-y-3">
        <Link to={"/"}>
          <div className="text-center flex gap-3 items-center justify-center mb-2">
            <DiGoogleDrive className="text-3xl text-sky-800" />
            <h1 className="font-medium text-2xl text-blue-950">IEI Drive</h1>
          </div>
        </Link>
      <div className="bg-white p-8 rounded-md shadow-md w-[95vw] sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
          >
            Sign Up
          </button>

          <div className="text-center pt-4">
            <h1>
              Already have an account ?{" "}
              <Link to="/login" className="text-blue-600 font-medium">
                Login
              </Link>
            </h1>
          </div>
        </form>

        <div
          className="rounded bg-gray-100 shadow-md p-3 text-center mx-auto w-full hover:shadow-md hover:shadow-blue-300 transition-all gap-x-3 mt-4 cursor-pointer flex justify-center items-center"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="text-3xl my-auto" />{" "}
          <p className="text-md text-gray-700">Sign Up with Google</p>
        </div>
        <div
          className="rounded bg-gray-100 shadow-md p-3 text-center mx-auto w-full hover:shadow-md hover:shadow-blue-300 transition-all gap-x-3 mt-4 cursor-pointer flex justify-center items-center"
          onClick={handleFacebookSignIn}
        >
          <FaFacebookSquare className="text-3xl my-auto" />{" "}
          <p className="text-md text-gray-700">Sign Up with Facebook</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
