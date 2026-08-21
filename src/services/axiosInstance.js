import axios from "axios";
import store from "../app/store";
import { logout } from "../features/auth/authSlice";


/* =========================================================
   API BASE URL
========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;


/* =========================================================
   AXIOS INSTANCE
========================================================= */

const axiosInstance = axios.create({

  baseURL: API_BASE_URL,

  headers: {
    "Content-Type":
      "application/json",

    Accept:
      "application/json",

    "ngrok-skip-browser-warning":
      "true",
  },

  withCredentials: true,
});


/* =========================================================
   REQUEST INTERCEPTOR
========================================================= */

axiosInstance.interceptors.request.use(

  (config) => {

    /*
     * First try Redux.
     */
    let sessionToken =
      store.getState()
        .auth
        .accessToken;


    /*
     * If Redux does not have it,
     * get it from sessionStorage.
     */
    if (!sessionToken) {

      sessionToken =
        sessionStorage.getItem(
          "sessionToken"
        );
    }


    console.log(
      "API:",
      config.method?.toUpperCase(),
      config.url
    );

    console.log(
      "Session token available:",
      Boolean(sessionToken)
    );


    /*
     * Backend requires:
     *
     * Authorization: Bearer <session-token>
     */
    if (sessionToken) {

      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${sessionToken}`;
    }


    return config;
  },


  (error) => {

    return Promise.reject(error);
  }
);


/* =========================================================
   RESPONSE INTERCEPTOR
========================================================= */

axiosInstance.interceptors.response.use(

  /*
   * SUCCESS
   */
  (response) => {

    return response;
  },


  /*
   * ERROR
   */
  (error) => {

    const status =
      error.response?.status;

    const requestUrl =
      error.config?.url || "";


    console.error(
      "API Error:",
      status,
      requestUrl,
      error.response?.data
    );


    /*
     * If session is invalid/expired,
     * clear authentication and return to login.
     *
     * Do NOT call refresh-token automatically here,
     * because your backend currently uses RefreshToken
     * itself as the session token.
     */
    if (
      status === 401 &&
      !requestUrl.includes(
        "/api/auth/login"
      ) &&
      !requestUrl.includes(
        "/api/auth/forgot-password"
      ) &&
      !requestUrl.includes(
        "/api/auth/verify-otp"
      ) &&
      !requestUrl.includes(
        "/api/auth/reset-password"
      )
    ) {

      store.dispatch(logout());

      window.location.href =
        "/";
    }


    return Promise.reject(error);
  }
);


export default axiosInstance;