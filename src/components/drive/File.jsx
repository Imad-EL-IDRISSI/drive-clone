import React from "react";
import { FaFile, FaImage, FaFilePdf, FaFileExcel, FaFileWord, FaFilePowerpoint } from "react-icons/fa";
import DeleteFileButton from "./DeleteFileButton";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";

const File = ({ file }) => {
  // Function to check if the file name indicates it's an image
  const isImageFile = (fileName) => {
    if (!fileName) return false;
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp", ".heic"];
    const extension = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();
    return imageExtensions.includes(extension);
  };

  // Function to get the appropriate icon based on file extension
  const getIcon = () => {
    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    switch (extension) {
      case ".pdf":
        return <FaFilePdf className="text-2xl text-red-500" />;
        case ".pptx":
        return <FaFilePowerpoint className="text-2xl text-orange-500" />;
      case ".xls":
      case ".xlsx":
        return <FaFileExcel className="text-2xl text-green-500" />;
      case ".doc":
      case ".docx":
        return <FaFileWord className="text-2xl text-blue-500" />;
      default:
        // Check if the file is an image based on its file name
        return isImageFile(file.name) ? <FaImage className="text-2xl text-blue-500" /> : <FaFile className="text-2xl text-gray-500" />;
    }
  };

  return (
    <div className="border-slate-400 border-[2px] rounded-md text-md px-2 py-3 m-2 gap-2 flex items-center">
      <div className="flex items-center justify-between w-full text-[#333333]">
        {getIcon()} {/* Render the appropriate icon */}
        <span className="truncate mx-2">{file.name}</span>
      </div>
      <Link to={file.url} download className="flex items-center justify-between w-full text-[#333333]">
        <FiDownload className="text-2xl text-sky-500" />
      </Link>
      <div className="cursor-pointer">
        <DeleteFileButton file={file} />
      </div>
    </div>
  );
};

export default File;
