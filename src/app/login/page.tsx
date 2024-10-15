"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";


enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
 const wixClient = useWixClient();
  const router = useRouter();

   const isLoggedIn = wixClient.auth.loggedIn();

   if (isLoggedIn) {
     router.push("/");
   }

  const [mode, setMode] = useState(MODE.LOGIN);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Your Password"
      : "Verify Your Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let response;

      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage("Password reset email sent. Please check your e-mail.");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful! You are being redirected.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password!");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password!");
          } else {
            setError("Something went wrong!");
          }
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");
        default:
          break;
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
   };

  return (

    <div className="mt-10 h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
    <div className="bg-white p-8 shadow-lg rounded-lg border-2 border-red-300">
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold text-center">{formTitle}</h1>
        {mode === MODE.REGISTER ? (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-700">Username</label>
      <div className="relative">
        <input
          type="text"
          name="username"
          placeholder="john"
          className="ring-2 ring-red-300 rounded-md p-2 pr-10" // Added padding-right for icon space
          onChange={(e) => setUsername(e.target.value)}
        />
        <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  ) : null}

{mode !== MODE.EMAIL_VERIFICATION ? (
  <div className="flex flex-col gap-2">
    <label className="text-sm text-gray-700">E-mail</label>
    <div className="relative">  {/* Added relative positioning */}
      <input
        type="email"
        name="email"
        placeholder="john@gmail.com"
        className="ring-2 ring-red-300 rounded-md p-2 pr-10" // Added padding-right for icon space
        onChange={(e) => setEmail(e.target.value)}
      />
      <FaEnvelope  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  </div>
) : (
  <div className="flex flex-col gap-2">
    <label className="text-sm text-gray-700">Verification Code</label>
    <input
      type="text"
      name="emailCode"
      placeholder="Code"
      className="ring-2 ring-red-300 rounded-md p-2"
      onChange={(e) => setEmailCode(e.target.value)}
    />
  </div>
)}

{mode === MODE.LOGIN || mode === MODE.REGISTER ? (
  <div className="flex flex-col gap-2">
    <label className="text-sm text-gray-700">Password</label>
    <div className="relative"> {/* Added relative positioning */}
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        className="ring-2 ring-red-300 rounded-md p-2 pr-10" // Added padding-right for icon space
        onChange={(e) => setPassword(e.target.value)}
      />
      <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> {/* FaLock icon */}
    </div>
  </div>
) : null}

{mode === MODE.LOGIN && (
  <div
    className="text-sm underline cursor-pointer"
    onClick={() => setMode(MODE.RESET_PASSWORD)}
  >
    Forgot Password?
  </div>
)}

        <button
          className="bg-red-300 text-white p-1 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : buttonTitle}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            {"Don't"} have an account?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have and account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login
          </div>
        )}
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
      </div>
    </div>
  );
};

export default LoginPage;