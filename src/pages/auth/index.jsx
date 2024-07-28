import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import "./styles.css";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import KoshaKeeperLogo2 from "../../assets/KoshaKeeperLogo2.png";
import GoogleLogo from "../../assets/goolelogo.png";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInwithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={KoshaKeeperLogo2} alt="कोष Keeper Logo" className="login-logo" />
        <h1>Welcome to कोष-Keeper👋</h1>
        <p>Your personal expense tracker. <br />Sign in to start managing your finances!</p>
        <button className="login-with-google-btn" onClick={signInwithGoogle}>
          <img src={GoogleLogo} alt="Google Logo" width="20" height="20" /> {/* Add the Google logo */}
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
