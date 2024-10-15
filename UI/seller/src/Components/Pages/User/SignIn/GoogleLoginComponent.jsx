import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginComponent = () => {
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // Send the credential to your backend
      console.log(credentialResponse)
      const response = await axios.post(
        "http://localhost:3000/api/v1/seller/auth/google",
        {
          credential: credentialResponse.credential,
        }
      );

      console.log("Login Success:", response.data);
      if (response) {
        const sellerId = response.data.user.id;
        const sellerName = response.data.user.name;
        const sellerEmail = response.data.user.email;
        const googleId = response.data.user.googleId;
        const sellerPhoto = response.data.user.photo;
        console.log(sellerPhoto)
        localStorage.setItem("sellerId", sellerId);
        localStorage.setItem("sellerEmail", sellerEmail);
        localStorage.setItem("sellerName", sellerName);
        localStorage.setItem("googleId", googleId);
        localStorage.setItem("sellerPhoto", sellerPhoto);
        navigate("/");
      }
      // Now handle the logged-in state, like saving tokens or redirecting
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={() => {
        console.log("Login Failed");
      }}
      size="large"
      width={1000}
    />
  );
};

export default GoogleLoginComponent;
