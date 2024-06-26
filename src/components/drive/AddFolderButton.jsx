import React, { useState } from "react";
import { VscNewFolder } from "react-icons/vsc";
import { useUserAuth } from "../../context/UserAuthContext";
import { serverTimestamp } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";

const AddFolderButton = ({ currentFolder }) => {
  const [modal, setModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUserAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!folderName.trim()) {
      setLoading(false);
      setModal(false);
      return;
    }

    const path = currentFolder === ROOT_FOLDER ? [] : [...currentFolder.path, currentFolder];
    
    const folderData = {
      name: folderName.trim(),
      userId: user.uid,
      parentId: currentFolder.id,
      createdAt: serverTimestamp(),
      path: path,
    };

    try {
      await addDoc(collection(db, "folders"), folderData);
      setFolderName("");
      setModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return (
      <div>
        <div onClick={() => setModal(true)} className="m-2 rounded-md bg-sky-100 transition-all w-max border-2 border-sky-200 hover:bg-sky-400">
          <VscNewFolder className="text-sky-900 transition-all p-2 hover:text-white text-5xl" />
        </div>
        
        {modal && (
          <div className="flex justify-center items-center fixed inset-0 backdrop-blur-md">
            <div className="bg-sky-100 rounded-md px-6 py-4 border-[2px] border-sky-200">
              <form onSubmit={handleSubmit}>
                <label htmlFor="folderName" className="block text-xl mb-3">Folder Name</label>
                <input
                  id="folderName"
                  type="text"
                  className="block w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-sky-500"
                  required
                  placeholder="Type here.."
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
                <div className="flex justify-end gap-x-3">
                  <button className="bg-gray-500 text-white py-2 px-3 font-medium rounded-md" onClick={() => setModal(false)}>Cancel</button>
                  <button type="submit" className="bg-sky-700 text-white py-2 px-3 font-medium rounded-md">
                    {loading ? "Creating..." : "Add Folder"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <h1>Loading...</h1>;
};

export default AddFolderButton;
