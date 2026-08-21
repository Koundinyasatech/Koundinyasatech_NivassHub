import axios from "axios";
import axiosInstance from "../../services/axiosInstance";

/* =========================================================
   API BASE URL
========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;


/* =========================================================
   LOGIN
========================================================= */

/*
  Login is a PUBLIC API.

  Do not depend on an old Authorization header
  stored in axiosInstance.

  Backend expects:

  Email Login:
  {
    "UserName": "sa@niv.com",
    "Password": "Admin@1234",
    "SocietyID": 1
  }

  Mobile Login:
  {
    "UserName": "9876543210",
    "Password": "Admin@1234",
    "SocietyID": 1,
    "mob_country_code": "+91"
  }
*/

export const loginAPI = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/login`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      },

      /*
        Login is public.
        Do not send old authenticated cookies
        unnecessarily.
      */
      withCredentials: false,
    }
  );

  return response.data;
};


/* =========================================================
   GET ADMIN PROFILE
========================================================= */

export const getProfileAPI = async () => {
  const response =
    await axiosInstance.get(
      "/api/auth/get-profile"
    );

  return response.data;
};


/* =========================================================
   UPDATE ADMIN PROFILE
========================================================= */

export const updateProfileAPI = async (
  payload
) => {
  const response =
    await axiosInstance.patch(
      "/api/auth/update-profile",
      payload
    );

  return response.data;
};


/* =========================================================
   FORGOT PASSWORD
========================================================= */

export const forgotPasswordAPI = async (
  payload
) => {
  const response =
    await axios.post(
      `${API_BASE_URL}/api/auth/forgot-password`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },

        withCredentials: false,
      }
    );

  return response.data;
};


/* =========================================================
   VERIFY FORGOT PASSWORD OTP
========================================================= */

export const verifyForgotPasswordOTPAPI =
  async (payload) => {
    const response =
      await axios.post(
        `${API_BASE_URL}/api/auth/verify-otp`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },

          withCredentials: false,
        }
      );

    return response.data;
  };


/* =========================================================
   RESEND FORGOT PASSWORD OTP
========================================================= */

export const resendForgotPasswordOTPAPI =
  async (payload) => {
    const response =
      await axios.post(
        `${API_BASE_URL}/api/auth/forgot-password`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },

          withCredentials: false,
        }
      );

    return response.data;
  };


/* =========================================================
   RESET PASSWORD
========================================================= */

export const resetPasswordAPI =
  async (payload) => {
    const response =
      await axios.post(
        `${API_BASE_URL}/api/auth/reset-password`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },

          withCredentials: false,
        }
      );

    return response.data;
  };


/* =========================================================
   LOGOUT
========================================================= */

export const logoutAPI = async () => {
  const response =
    await axiosInstance.post(
      "/api/auth/logout"
    );

  return response.data;
};