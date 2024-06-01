import React from "react";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function FolderBreadcrumbs({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];

  console.log("Current Folder Path:", path);
  console.log("Current Folder:", currentFolder);

  return (
    <div className="flex-grow w-full bg-white p-0 m-0">
      {path.map((folder, index) => (
        <span key={folder.id} className="inline-block max-w-[150px] truncate">
          <Link
            to={{
              pathname: folder.id ? `/folders/${folder.id}` : "/",
              state: { folder: { ...folder, path: path.slice(1, index) } },
            }}
            className="text-blue-500 font-medium text-lg"
          >
            {folder.name}
          </Link>
          {index < path.length - 1 && (
            <span className="mx-1 text-gray-500">{'>'}</span>
          )}
        </span>
      ))}
      {currentFolder && (
        <span className="inline-block max-w-[200px] truncate text-slate-700 text-lg font-medium">
          {currentFolder.name}
        </span>
      )}
    </div>
  );
}
