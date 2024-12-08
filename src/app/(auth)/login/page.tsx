"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // New state for confirm password error
  const [generalError, setGeneralError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");

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
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError(""); // Reset confirm password error
    setGeneralError("");
    setUsernameError("");

    let hasError = false;

    // Kiểm tra email
    if (!email) {
      setEmailError("Please enter your email");
      hasError = true;
    }

    // Kiểm tra mật khẩu (nếu mode là LOGIN hoặc REGISTER)
    if (!password && (mode === MODE.LOGIN || mode === MODE.REGISTER)) {
      setPasswordError("Please enter your password");
      hasError = true;
    }

    if (mode === MODE.REGISTER) {
      // Kiểm tra username
      if (!username) {
        setUsernameError("Please enter your username");
        hasError = true;
      }

      // Kiểm tra confirm password
      if (!confirmPassword) {
        setConfirmPasswordError("Please confirm your password");
        hasError = true;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        hasError = true;
      }
    }

    // Nếu có lỗi, dừng xử lý và không gửi yêu cầu
    if (hasError) {
      setIsLoading(false);
      return;
    }

    try {
      let response: any;

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
          if (response?.loginState === LoginState.SUCCESS) {
            const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
              response.data.sessionToken!
            );
            Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
              expires: 2,
            });
            wixClient.auth.setTokens(tokens);
            setMessage("Password reset successful! You are being redirected.");
            router.push("http://localhost:3000/login");
          } else {
            setMessage("Password reset email sent. Please check your e-mail.");
          }
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
          if (mode === MODE.REGISTER) {
            setMessage(
              "Registration successful. Please verify your email with the code sent."
            );
            setMode(MODE.EMAIL_VERIFICATION);
          } else {
            setMessage("Successful! You are being redirected.");
            const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
              response.data.sessionToken!
            );
            Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
              expires: 2,
            });
            wixClient.auth.setTokens(tokens);
            router.push("/");
          }
          break;

        case LoginState.FAILURE:
          if (response?.errorCode === "invalidEmail") {
            setEmailError("Invalid email address!");
            setPasswordError("");
          } else if (response?.errorCode === "invalidPassword") {
            setPasswordError("Invalid password!");
            setEmailError("");
          } else if (response?.errorCode === "emailAlreadyExists") {
            setEmailError("Email already exists!");
            setPasswordError("");
          } else if (response?.errorCode === "resetPassword") {
            setGeneralError("You need to reset your password!");
            setEmailError("");
            setPasswordError("");
          } else {
            setGeneralError("Invalid credentials or something went wrong.");
          }
          break;

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
          break;

        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");
          break;

        default:
          setGeneralError("Something went wrong!");
          break;
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setGeneralError("");
    setError("");
    setMessage("");
  }, [mode]);

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
                  className="ring-2 ring-red-300 rounded-md p-2 pr-10 w-full"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              {usernameError && (
                <div className="text-red-600 text-sm mt-1">{usernameError}</div>
              )}
            </div>
          ) : null}

          {mode !== MODE.EMAIL_VERIFICATION ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">E-mail</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="john@gmail.com"
                  className="ring-2 ring-red-300 rounded-md p-2 pr-10 w-full"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              {emailError && (
                <div className="text-red-600 text-sm mt-1">{emailError}</div>
              )}
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
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="ring-2 ring-red-300 rounded-md p-2 pr-10 w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              {passwordError && (
                <div className="text-red-600 text-sm mt-1">{passwordError}</div>
              )}
            </div>
          ) : null}

          {mode === MODE.REGISTER ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="ring-2 ring-red-300 rounded-md p-2 pr-10 w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              {confirmPasswordError && (
                <div className="text-red-600 text-sm mt-1">
                  {confirmPasswordError}
                </div>
              )}
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
              Have an account?
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
