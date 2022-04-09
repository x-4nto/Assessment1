import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAd-BcHWG-BGp1VU2QSvJGH1oL2XEJsqVE",
  authDomain: "image-upload-2eca3.firebaseapp.com",
  projectId: "image-upload-2eca3",
  storageBucket: "image-upload-2eca3.appspot.com",
  messagingSenderId: "550526066291",
  appId: "1:550526066291:web:327bc1050874e41aea9406",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage, ref, uploadBytes, getDownloadURL };
