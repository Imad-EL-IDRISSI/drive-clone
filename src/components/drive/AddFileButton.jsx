import React, { useState } from "react";
import { VscNewFile } from "react-icons/vsc";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { storage, db } from "../../config/firebase";
import { useUserAuth } from "../../context/UserAuthContext";
import { serverTimestamp } from "firebase/firestore";
import { FiUpload } from "react-icons/fi";

const AddFileButton = ({ currentFolder }) => {
  const { user } = useUserAuth();
  const [percentage, setPercentage] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file || !currentFolder) return;

    const filePath = `${currentFolder.path.join("/")}/${file.name}`;
    const uploadRef = ref(storage, `files/${user.uid}/${filePath}`);

    setShowProgress(true);
    const uploadTask = uploadBytesResumable(uploadRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(Math.round(progress, 2));
      },
      (error) => {
        console.log(error);
        setShowProgress(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const fileData = {
            name: file.name,
            url: downloadURL,
            createdAt: serverTimestamp(),
            folderId: currentFolder.id,
            userId: user.uid,
            path: filePath,
          };
          try {
            await addDoc(collection(db, "files"), fileData);
            setShowProgress(false);
          } catch (error) {
            console.log(error);
            setShowProgress(false);
          }
        });
      }
    );
  }

  return (
    <div>
      <div className="m-2 rounded-md bg-sky-100 transition-all w-max border-2 border-sky-200 hover:bg-sky-400">
        <label>
          <VscNewFile className="text-sky-900 transition-all p-2 hover:text-white text-5xl" />
          <input type="file" className="opacity-0 w-full absolute left-[-9999999px]" onChange={handleUpload} />
        </label>
      </div>

      {showProgress && (
        <div className="fixed bottom-0 right-0 flex gap-3 bg-sky-100 rounded-md m-6 px-6 py-4 drop-shadow-lg border-[1px] border-gray-400">
          <FiUpload className="text-2xl" />
          <div className="font-medium">Uploading... {percentage} % Completed</div>
        </div>
      )}
    </div>
  );
};

export default AddFileButton;
