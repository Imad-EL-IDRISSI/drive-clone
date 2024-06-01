import { useEffect, useReducer } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { query, where, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { useUserAuth } from "../context/UserAuthContext";

export const ACTIONS = {
  SELECT_FOLDER: "SELECT_FOLDER",
  UPDATE_FOLDER: "UPDATE_FOLDER",
  SET_CHILD_FOLDERS: "SET_CHILD_FOLDERS",
  SET_CHILD_FILES: "SET_CHILD_FILES",
  SET_LOADING: "SET_LOADING",
};

export const ROOT_FOLDER = {
  id: null,
  name: "Home",
  path: [],
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        ...state,
        folder: action.payload.folder,
        folderId: action.payload.folderId,
        childFiles: [],
        childFolders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: action.payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: action.payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: action.payload.childFiles,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
}

export function useFolder(folderId = null, folder = null) {
  const initialState = {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
    loading: false,
  };

  const { user } = useUserAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folder, folderId } });
  }, [folderId, folder]);

  async function updateFolder() {
    if (folderId == null) {
      dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER } });
      return;
    }
    // Fetch from Firestore
    try {
      const docRef = doc(db, "folders", folderId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const doc = docSnap.data();
        const formattedDoc = {
          ...doc,
          id: docSnap.id,
        };

        dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: formattedDoc } });
      } else {
        dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER } });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    updateFolder();
  }, [folderId]);

  function setChildFolders() {
    dispatch({ type: ACTIONS.SET_LOADING, payload: { loading: true } });
    const foldersRef = collection(db, "folders");
    const q = query(
      foldersRef,
      where("parentId", "==", folderId),
      where("userId", "==", user.uid),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const childFolders = [];
      snapshot.forEach((docSnap) => {
        const doc = docSnap.data();
        const formattedDoc = {
          ...doc,
          id: docSnap.id,
        };
        childFolders.push(formattedDoc);
      });

      dispatch({ type: ACTIONS.SET_CHILD_FOLDERS, payload: { childFolders } });
      dispatch({ type: ACTIONS.SET_LOADING, payload: { loading: false } });
    });

    return unsubscribe;
  }

  useEffect(() => {
    const unsubscribeFolder = setChildFolders();
    return () => {
      unsubscribeFolder();
    };
  }, [folderId, user]);

  function setChildFiles() {
    dispatch({ type: ACTIONS.SET_LOADING, payload: { loading: true } });
    const filesRef = collection(db, "files");
    const q = query(
      filesRef,
      where("folderId", "==", folderId),
      where("userId", "==", user.uid),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const childFiles = [];
      snapshot.forEach((docSnap) => {
        const fileData = {
          id: docSnap.id,
          ...docSnap.data(),
        };
        childFiles.push(fileData);
      });
      console.log("Fetched files:", childFiles);

      dispatch({ type: ACTIONS.SET_CHILD_FILES, payload: { childFiles } });
      dispatch({ type: ACTIONS.SET_LOADING, payload: { loading: false } });
    });

    return unsubscribe;
  }

  useEffect(() => {
    const unsubscribeFiles = setChildFiles();
    return () => {
      unsubscribeFiles();
    };
  }, [folderId, user]);

  return state;
}
