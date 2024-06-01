import React from "react";
import { useFolder } from "../../hooks/useFolder";
import Folder from "./Folder";
import File from "./File";

const TargetFolder = ({ folderId }) => {
  const { childFolders, childFiles } = useFolder(folderId);

  return (
    <div>
      <div>
        {childFolders.length > 0 && (
          <>
            <h3 className="mt-5 mb-3 text-lg font-bold">Folders</h3>
            <div className="flex flex-wrap">
              {childFolders.map((childFolder) => (
                <div key={childFolder.id} style={{ maxWidth: "250px" }} className="p-2">
                  <Folder folder={childFolder} />
                </div>
              ))}
            </div>
          </>
        )}

        {childFiles.length > 0 && (
          <>
            <h3 className="mt-5 mb-3 text-lg font-bold">Files</h3>
            <div className="flex flex-wrap">
              {childFiles.map((file) => (
                <div key={file.id} style={{ maxWidth: "250px" }} className="p-2">
                  <File file={file} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TargetFolder;
