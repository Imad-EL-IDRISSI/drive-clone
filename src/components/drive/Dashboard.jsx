import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import AddFolderButton from "./AddFolderButton";
import { useFolder } from "../../hooks/useFolder";
import FolderBreadcrumbs from "./FolderBreadcrums";
import AddFileButton from "./AddFileButton";
import TargetFolder from "./TargetFolder";

const Dashboard = () => {
  const { folderId } = useParams();
  const { folder } = useFolder(folderId);

  return (
    <div>
      <Navbar />
      <div className="w-[95vw] mt-4 mx-auto">
        <div className="flex justify-between">
          <FolderBreadcrumbs currentFolder={folder} />
          <div className="flex flex-grow-1">
            <AddFolderButton currentFolder={folder} />
            <AddFileButton currentFolder={folder} />
          </div>
        </div>
        <TargetFolder folderId={folderId} />
      </div>
    </div>
  );
};

export default Dashboard;
