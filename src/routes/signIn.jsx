import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../../firebase.config";
import { getOrCreateUser } from "../utils/user";
import { useEffect } from "react";

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    const { role } = await getOrCreateUser(
      user.email,
      user.displayName,
      user.photoURL
    );

    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userName", user.displayName);
    localStorage.setItem("userToken", user.accessToken);
    localStorage.setItem("userImage", user.photoURL);

    if (role) {
      navigate("/posts");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/posts");
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen p-32">
      <div className="text-center max-w-5xl mx-auto text-slate-950 text-3xl mb-10">
        <h1>Welocome to the Google Sign In Page</h1>
      </div>
      <button
        className="px-4 py-2 bg-indigo-600 text-slate-100 rounded mx-auto my-auto block"
        onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
