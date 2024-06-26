import React from "react";
import Navbar from "./drive/Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto my-8 p-8 bg-white rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 ">
          Welcome to IEI Drive
        </h1>
        <p className="text-lg text-gray-700 mb-6 ">
          IEI Drive simplifies file management, offering a seamless experience
          for users to organize and control their digital assets. Our
          user-friendly platform provides a range of features to enhance your
          file management workflow.
        </p>
        <div className="bg-sky-50 p-5 rounded-md shadow-md my-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 ">
              Features
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6 ">
            <li>
              Effortless File Uploads: Easily upload files to your account.
            </li>
            <li>
              Intuitive Folder Organization: Create, and organize
              folders for efficient file management.
            </li>
            <li>
              Secure File Deletion: Safely delete files with confidence, knowing
              your data is protected.
            </li>
            <li>
              Real-time Sync: Access your files from anywhere with real-time
              synchronization.
            </li>
            {/* Add more features here */}
          </ul>
        </div>
        <div className="bg-violet-50 p-5 rounded-md shadow-md my-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 ">
            Getting Started
          </h2>
          <p className="text-lg text-gray-700 mb-6 ">
            To get started, log in or sign up for a IEI Drive free account. Once
            logged in, you'll have access to a personalized dashboard where you
            can manage your files and folders efficiently.
          </p>
          <p className="text-lg text-gray-700 mb-6 ">
            Start your journey with IEI Drive today and experience the
            convenience of organized and secure file management.
          </p>
          <Link
            to={"/login"}
            className="px-3 py-2 bg-sky-700 text-white rounded-md"
          >
            Login
          </Link>
        </div>

        <p className="text-lg bg-orange-100 px-4 py-2 rounded-md mb-6 animate__animated animate__flash animate__infinite animate__slower">
          ⚠️ Caution: Right now it is under development stage, all of you
          current stored files may get deleted! We recommend you to keep a
          backup! Also because it is using a free tier storage, therefore there
          is a size limitation!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
