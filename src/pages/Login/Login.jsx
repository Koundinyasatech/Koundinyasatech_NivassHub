import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import axiosInstance from "../../services/axiosInstance";
import { loginAPI } from "../../features/auth/authAPI";
import { setCredentials } from "../../features/auth/authSlice";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* =========================================================
     STATE
  ========================================================= */

  const [societies, setSocieties] = useState([]);

  const [loadingSocieties, setLoadingSocieties] =
    useState(true);

  const [loggingIn, setLoggingIn] =
    useState(false);

  const [formData, setFormData] = useState({
    society: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [errorMessage, setErrorMessage] =
    useState("");


  /* =========================================================
     LOAD ACTIVE SOCIETIES
  ========================================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchSocieties = async () => {
      try {
        setLoadingSocieties(true);
        setErrorMessage("");

        console.log(
          "Calling Active Societies API..."
        );

        const response =
          await axiosInstance.get(
            "/api/auth/active"
          );

        console.log(
          "Active societies response:",
          response.data
        );

        const responseData =
          response?.data || {};

        const societyData =
          responseData?.ActiveSocieties ||
          responseData?.activeSocieties ||
          responseData?.Data ||
          responseData?.data ||
          [];

        if (!isMounted) {
          return;
        }

        if (Array.isArray(societyData)) {
          setSocieties(societyData);
        } else {
          setSocieties([]);
        }

      } catch (error) {
        console.error(
          "Failed to fetch societies:",
          error
        );

        if (!isMounted) {
          return;
        }

        setSocieties([]);

        setErrorMessage(
          error?.response?.data?.Message ||
          error?.response?.data?.message ||
          error?.message ||
          "Unable to load societies."
        );

      } finally {
        if (isMounted) {
          setLoadingSocieties(false);
        }
      }
    };

    fetchSocieties();

    return () => {
      isMounted = false;
    };
  }, []);


  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

    setErrors(
      (previous) => ({
        ...previous,
        [name]: "",
      })
    );

    setErrorMessage("");
  };


  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    const newErrors = {};

    /* ---------------------------------------------------------
       SOCIETY
    --------------------------------------------------------- */

    if (!formData.society) {
      newErrors.society =
        "Please select a society.";
    }


    /* ---------------------------------------------------------
       EMAIL
    --------------------------------------------------------- */

    const trimmedEmail =
      formData.email.trim();

    if (!trimmedEmail) {
      newErrors.email =
        "Please enter your email address.";

    } else {

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(trimmedEmail)) {
        newErrors.email =
          "Please enter a valid email address.";
      }
    }


    /* ---------------------------------------------------------
       PASSWORD
    --------------------------------------------------------- */

    if (!formData.password) {
      newErrors.password =
        "Please enter your password.";
    }


    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };


  /* =========================================================
     GET SOCIETY ID
  ========================================================= */

  const getSocietyId = () => {

    const selectedSociety =
      societies.find(
        (society) => {

          const id =
            society?.Society_ID ??
            society?.SocietyId ??
            society?.society_id ??
            society?.societyId ??
            society?.ID ??
            society?.id;

          return (
            String(id) ===
            String(formData.society)
          );
        }
      );

    return (
      selectedSociety?.Society_ID ??
      selectedSociety?.SocietyId ??
      selectedSociety?.society_id ??
      selectedSociety?.societyId ??
      selectedSociety?.ID ??
      selectedSociety?.id ??
      formData.society
    );
  };


  /* =========================================================
     GET SOCIETY NAME
  ========================================================= */

  const getSocietyName = () => {

    const selectedSociety =
      societies.find(
        (society) => {

          const id =
            society?.Society_ID ??
            society?.SocietyId ??
            society?.society_id ??
            society?.societyId ??
            society?.ID ??
            society?.id;

          return (
            String(id) ===
            String(formData.society)
          );
        }
      );

    return (
      selectedSociety?.Society_Name ||
      selectedSociety?.SocietyName ||
      selectedSociety?.society_name ||
      selectedSociety?.societyName ||
      selectedSociety?.Name ||
      selectedSociety?.name ||
      ""
    );
  };


  /* =========================================================
     LOGIN
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (loggingIn) {
      return;
    }

    if (!validateForm()) {
      return;
    }


    try {

      setLoggingIn(true);


      /* =====================================================
         SELECTED SOCIETY
      ===================================================== */

      const societyId =
        getSocietyId();

      const societyName =
        getSocietyName();


      /* =====================================================
         LOGIN PAYLOAD

         IMPORTANT:

         NEW BACKEND CONTRACT:

         {
           "UserName": "sa@niv.com",
           "Password": "Admin@1234",
           "SocietyID": 1
         }

         Since this is EMAIL LOGIN,
         mob_country_code is NOT sent.

         Also removed old:
         IPAddress
         DeviceInfo
      ===================================================== */

      const payload = {
        UserName:
          formData.email.trim(),

        Password:
          formData.password,

        SocietyID:
          Number(societyId),
      };


      console.log(
        "EMAIL LOGIN REQUEST:",
        {
          ...payload,
          Password: "********",
        }
      );


      /* =====================================================
         CALL LOGIN API
      ===================================================== */

      const response =
        await loginAPI(payload);


      console.log(
        "LOGIN API RESPONSE:",
        response
      );


      /* =====================================================
         VALIDATE LOGIN RESPONSE
      ===================================================== */

      if (
        !response ||
        Number(response?.Status) !== 200
      ) {

        throw new Error(
          response?.Message ||
          response?.message ||
          "Login failed."
        );
      }


      /* =====================================================
         CHECK USER ID
      ===================================================== */

      if (!response?.UserId) {

        console.error(
          "UserId missing:",
          response
        );

        throw new Error(
          response?.Message ||
          "User information was not received from the server."
        );
      }


      /* =====================================================
         SESSION TOKEN

         BACKEND:

         RefreshToken:
         "21_refresh_A5D..."

         This is the session token required
         for authenticated APIs.
      ===================================================== */

      const sessionToken =
        response?.RefreshToken ||
        response?.refreshToken ||
        response?.SessionToken ||
        response?.sessionToken;


      if (!sessionToken) {

        console.error(
          "SESSION TOKEN MISSING FROM LOGIN RESPONSE:",
          response
        );

        throw new Error(
          "Session token missing. Please check the login API response."
        );
      }


      console.log(
        "Session token received successfully."
      );


      /* =====================================================
         USER STATUS
      ===================================================== */

      const userStatus =
        response?.UserStatus || "";


      const societyStatus =
        response?.societyStatus || "";


      /* =====================================================
         CHECK USER STATUS

         Backend:
         UserStatus = "A"

         A = Active
      ===================================================== */

      if (
        userStatus &&
        userStatus !== "A"
      ) {

        throw new Error(
          "Your user account is inactive."
        );
      }


      /* =====================================================
         CHECK SOCIETY STATUS

         Backend:
         societyStatus = "A"

         A = Active
      ===================================================== */

      if (
        societyStatus &&
        societyStatus !== "A"
      ) {

        throw new Error(
          "The selected society is inactive."
        );
      }


      /* =====================================================
         AUTHENTICATED USER
      ===================================================== */

      const loggedInUser = {

        UserId:
          response?.UserId || "",

        Role_Name:
          response?.Role_Name || "",

        SocietyID:
          Number(societyId),

        SocietyName:
          societyName,

        UserStatus:
          userStatus,

        societyStatus:
          societyStatus,
      };


      console.log(
        "Authenticated user:",
        loggedInUser
      );


      /* =====================================================
         SAVE SESSION TOKEN

         Keep these for the existing application
         architecture.
      ===================================================== */

      localStorage.setItem(
        "sessionToken",
        sessionToken
      );

      localStorage.setItem(
        "accessToken",
        sessionToken
      );


      /* =====================================================
         SAVE USER

         Used by existing application components.
      ===================================================== */

      localStorage.setItem(
        "user",
        JSON.stringify(
          loggedInUser
        )
      );


      /* =====================================================
         SAVE authUser

         Your Profile page reads Role_Name
         from sessionStorage.authUser.

         Therefore we need to save it here.
      ===================================================== */

      sessionStorage.setItem(
        "authUser",
        JSON.stringify(
          loggedInUser
        )
      );


      /* =====================================================
         AXIOS AUTHORIZATION

         Authenticated requests will use:

         Authorization:
         Bearer <RefreshToken>
      ===================================================== */

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] =
        `Bearer ${sessionToken}`;


      /* =====================================================
         REDUX AUTH STATE
      ===================================================== */

      dispatch(
        setCredentials({

          user:
            loggedInUser,

          /*
           * Backend RefreshToken
           * is being used as the
           * session/access token.
           */

          accessToken:
            sessionToken,

          modules:
            Array.isArray(
              response?.modules
            )
              ? response.modules
              : Array.isArray(
                  response?.Modules
                )
                ? response.Modules
                : [],
        })
      );


      /* =====================================================
         FINAL LOGIN SUCCESS
      ===================================================== */

      console.log(
        "LOGIN SUCCESSFUL"
      );

      console.log(
        "User ID:",
        response.UserId
      );

      console.log(
        "Role:",
        response.Role_Name
      );

      console.log(
        "Society Status:",
        response.societyStatus
      );

      console.log(
        "User Status:",
        response.UserStatus
      );

      console.log(
        "Session token saved successfully."
      );


      setErrorMessage("");


      /* =====================================================
         NAVIGATE
      ===================================================== */

      navigate(
        "/foundation",
        {
          replace: true,
        }
      );


    } catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );


      const backendData =
        error?.response?.data;


      const backendMessage =
        backendData?.Message ||
        backendData?.message ||
        error?.message;


      if (
        Array.isArray(
          backendMessage
        )
      ) {

        setErrorMessage(
          backendMessage.join(", ")
        );

      } else {

        setErrorMessage(
          backendMessage ||
          "Unable to login. Please check your credentials."
        );
      }


    } finally {

      setLoggingIn(false);

    }
  };


  /* =========================================================
     FORGOT PASSWORD
  ========================================================= */

  const handleForgotPassword = () => {

    if (loggingIn) {
      return;
    }

    setErrorMessage("");

    navigate(
      "/forgot-password",
      {
        state: {
          email:
            formData.email.trim(),
        },
      }
    );
  };


  /* =========================================================
     MOBILE LOGIN
  ========================================================= */

  const handleMobileLogin = () => {

    if (loggingIn) {
      return;
    }

    setErrorMessage("");

    navigate(
      "/login/phone"
    );
  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="login-page">

      {/* =================================================
          LEFT SECTION
      ================================================= */}

      <div className="login-left">

        <div className="overlay"></div>

        <div className="hero-content">

          {/* BRAND */}

          <div className="brand">

            <h1>
              Nivass
              <span>Hub</span>
            </h1>

            <p>
              Smart Society Management Platform
            </p>

          </div>


          {/* HERO */}

          <div className="hero-main">

            <h2>
              Simplify Living.
              <br />
              Strengthen Communities.
            </h2>

            <p className="hero-text">
              Manage your society operations,
              residents and finances — all in one
              smart platform.
            </p>

          </div>


          {/* STATS */}

          <div className="stats-bar">

            <div className="stat-item">

              <h3>
                50+
              </h3>

              <p>
                Societies
              </p>

            </div>


            <div className="stat-item">

              <h3>
                10K+
              </h3>

              <p>
                Residents
              </p>

            </div>


            <div className="stat-item">

              <h3>
                99.9%
              </h3>

              <p>
                Uptime
              </p>

            </div>


            <div className="stat-item">

              <h3>
                24/7
              </h3>

              <p>
                Support
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          RIGHT SECTION
      ================================================= */}

      <div className="login-right">

        <div className="login-card">


          {/* LOGO */}

          <div className="logo-box">

            <h2>
              Nivass
              <span>Hub</span>
            </h2>

            <p>
              Smart Society Management Platform
            </p>

          </div>


          {/* HEADING */}

          <h1>
            Welcome Back!
          </h1>

          <p className="login-description">
            Sign in using your email address
          </p>


          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
          >


            {/* =================================================
                SOCIETY
            ================================================= */}

            <div className="input-group">

              <label htmlFor="society">
                Society
              </label>

              <select
                id="society"
                name="society"
                value={
                  formData.society
                }
                onChange={
                  handleChange
                }
                disabled={
                  loadingSocieties ||
                  loggingIn
                }
              >

                <option value="">

                  {loadingSocieties
                    ? "Loading societies..."
                    : "Select Society"}

                </option>


                {societies.map(
                  (
                    society,
                    index
                  ) => {

                    const id =
                      society?.Society_ID ??
                      society?.SocietyId ??
                      society?.society_id ??
                      society?.societyId ??
                      society?.ID ??
                      society?.id ??
                      index;


                    const name =
                      society?.Society_Name ||
                      society?.SocietyName ||
                      society?.society_name ||
                      society?.societyName ||
                      society?.Name ||
                      society?.name ||
                      `Society ${index + 1}`;


                    return (

                      <option
                        key={id}
                        value={id}
                      >
                        {name}
                      </option>

                    );

                  }
                )}

              </select>


              {errors.society && (

                <p className="login-error">
                  {errors.society}
                </p>

              )}

            </div>


            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="input-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                disabled={
                  loggingIn
                }
                autoComplete="username"
              />


              {errors.email && (

                <p className="login-error">
                  {errors.email}
                </p>

              )}

            </div>


            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="input-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-input-wrapper">

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    loggingIn
                  }
                  autoComplete="current-password"
                />


                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  disabled={
                    loggingIn
                  }
                >

                  {showPassword
                    ? "Hide"
                    : "Show"}

                </button>

              </div>


              {errors.password && (

                <p className="login-error">
                  {errors.password}
                </p>

              )}

            </div>


            {/* =================================================
                API ERROR
            ================================================= */}

            {errorMessage && (

              <p className="login-error">
                {errorMessage}
              </p>

            )}


            {/* =================================================
                OPTIONS
            ================================================= */}

            <div className="options">

              <label className="remember-option">

                <input
                  type="checkbox"
                  disabled={
                    loggingIn
                  }
                />

                <span>
                  Remember me
                </span>

              </label>


              <button
                type="button"
                className="text-action-button"
                onClick={
                  handleForgotPassword
                }
                disabled={
                  loggingIn
                }
              >
                Forgot password?
              </button>

            </div>


            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              className="login-submit-button"
              disabled={
                loggingIn ||
                loadingSocieties
              }
            >

              {loggingIn
                ? "Logging in..."
                : "Login"}

            </button>


            {/* =================================================
                MOBILE LOGIN
            ================================================= */}

            <div className="alternate-login">

              <div className="alternate-divider">

                <span></span>

                <p>
                  OR
                </p>

                <span></span>

              </div>


              <button
                type="button"
                className="login-method-link"
                onClick={
                  handleMobileLogin
                }
                disabled={
                  loggingIn
                }
              >
                Login with mobile number
              </button>

            </div>


          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;