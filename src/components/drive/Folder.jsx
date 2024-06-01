import React from "react";
import { Link } from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import DeleteFolderButton from "./DeleteFolderButton";

export default function Folder({ folder }) {
  return (
  <div className="flex items-center border border-gray-300 rounded-md text-gray-800 px-4 py-2 w-full truncate hover:bg-gray-100 cursor-pointer">
    <Link
      to={`/folders/${folder.id}`}
      state={{ folder: folder }}
      className="flex items-center  text-gray-900  w-full truncate "
    >
      <FaFolder className="mr-2 text-blue-500" />
      <span className="truncate mr-2">{folder.name}</span>
    </Link>
    <DeleteFolderButton folder={folder}  />
    
  </div>
  );
}
