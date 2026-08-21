import "./Login.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "../../features/auth/authSlice";
import { loginAPI } from "../../features/auth/authAPI";

function PhoneLogin() {
  const [societies, setSocieties] = useState([]);
  const [countries, setCountries] = useState([]);

  const [societyId, setSocietyId] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const [loadingData, setLoadingData] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* =========================================
     LOAD ACTIVE SOCIETIES + COUNTRIES
  ========================================= */

  useEffect(() => {
    const fetchActiveData = async () => {
      try {
        setLoadingData(true);
        setErrorMessage("");

        const baseUrl =
          import.meta.env.VITE_API_BASE_URL;

        if (!baseUrl) {
          throw new Error(
            "VITE_API_BASE_URL is not configured."
          );
        }

        const response = await fetch(
          `${baseUrl}/api/auth/active`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const contentType =
          response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          throw new Error(
            "Server returned an invalid response."
          );
        }

        const data = await response.json();

        console.log(
          "Active API response:",
          data
        );

        if (
          response.ok &&
          (data?.StatusCode === 200 ||
            data?.Status === 200)
        ) {
          const activeSocieties =
            Array.isArray(data?.ActiveSocieties)
              ? data.ActiveSocieties
              : [];

          const activeCountries =
            Array.isArray(data?.ActiveCountries)
              ? data.ActiveCountries
              : [];

          setSocieties(activeSocieties);
          setCountries(activeCountries);

          /* Default India */
          const india = activeCountries.find(
            (country) =>
              country?.country_calling_Code === "+91"
          );

          if (india) {
            setCountryCode(
              india.country_calling_Code
            );
          } else if (activeCountries.length > 0) {
            setCountryCode(
              activeCountries[0]
                ?.country_calling_Code || "+91"
            );
          }
        } else {
          setSocieties([]);
          setCountries([]);

          setErrorMessage(
            data?.Message ||
              "Unable to load login data."
          );
        }
      } catch (error) {
        console.error(
          "Failed to load login data:",
          error
        );

        setSocieties([]);
        setCountries([]);

        setErrorMessage(
          error?.message ||
            "Unable to connect to the server."
        );
      } finally {
        setLoadingData(false);
      }
    };

    fetchActiveData();
  }, []);

  /* =========================================
     MOBILE NUMBER
  ========================================= */

  const handleMobileChange = (e) => {
    const numbersOnly =
      e.target.value.replace(/\D/g, "");

    setMobileNumber(numbersOnly);
  };

  /* =========================================
     FORGOT PASSWORD
  ========================================= */

  const handleForgotPassword = () => {
    setErrorMessage("");

    navigate("/forgot-password");
  };

  /* =========================================
     EMAIL LOGIN
  ========================================= */

  const handleEmailLogin = () => {
    setErrorMessage("");

    navigate("/login");
  };

  /* =========================================
     MOBILE LOGIN
  ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    /* Society */
    if (!societyId) {
      setErrorMessage(
        "Please select a society."
      );
      return;
    }

    /* Country */
    if (!countryCode) {
      setErrorMessage(
        "Please select a country code."
      );
      return;
    }

    /* Mobile */
    if (!mobileNumber.trim()) {
      setErrorMessage(
        "Please enter your mobile number."
      );
      return;
    }

    if (mobileNumber.length < 7) {
      setErrorMessage(
        "Please enter a valid mobile number."
      );
      return;
    }

    /* Password */
    if (!password) {
      setErrorMessage(
        "Please enter your password."
      );
      return;
    }

    try {
      setLoggingIn(true);

      const selectedSociety =
        societies.find(
          (society) =>
            String(society.Society_ID) ===
            String(societyId)
        );

      const payload = {
        MobileNumber:
          mobileNumber.trim(),

        CountryCallingCode:
          countryCode,

        Password: password,

        SocietyID:
          Number(societyId),

        IPAddress:
          "127.0.0.1",

        DeviceInfo:
          navigator.userAgent,
      };

      console.log(
        "Mobile Login payload:",
        payload
      );

      const data =
        await loginAPI(payload);

      console.log(
        "Mobile Login response:",
        data
      );

      if (
        data?.Status === 200 &&
        data?.UserId
      ) {
        const loggedInUser = {
          UserId: data.UserId,

          Role_Name:
            data.Role_Name,

          SocietyID:
            Number(societyId),

          SocietyName:
            selectedSociety
              ?.Society_Name || "",
        };

        dispatch(
          setCredentials({
            user: loggedInUser,

            accessToken:
              data?.AccessToken ||
              data?.accessToken ||
              null,

            modules:
              data?.modules || [],
          })
        );

        navigate("/foundation");
      } else {
        setErrorMessage(
          data?.Message ||
            "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error(
        "Mobile login error:",
        error
      );

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.Message;

      setErrorMessage(
        Array.isArray(backendMessage)
          ? backendMessage.join(", ")
          : backendMessage ||
              error?.message ||
              "Unable to login. Please try again."
      );
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="login-page">

      {/* =========================================
          LEFT SECTION
      ========================================= */}

      <div className="login-left">
        <div className="overlay"></div>

        <div className="hero-content">

          <div className="brand">
            <h1>
              Nivass
              <span>Hub</span>
            </h1>

            <p>
              Smart Society Management Platform
            </p>
          </div>

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

          <div className="stats-bar">

            <div className="stat-item">
              <h3>50+</h3>
              <p>Societies</p>
            </div>

            <div className="stat-item">
              <h3>10K+</h3>
              <p>Residents</p>
            </div>

            <div className="stat-item">
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>

            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support</p>
            </div>

          </div>

        </div>
      </div>

      {/* =========================================
          RIGHT SECTION
      ========================================= */}

      <div className="login-right">

        <div className="login-card">

          <div className="logo-box">
            <h2>
              Nivass
              <span>Hub</span>
            </h2>

            <p>
              Smart Society Management Platform
            </p>
          </div>

          <h1>
            Welcome Back!
          </h1>

          <p className="login-description">
            Sign in using your mobile number
          </p>

          <form onSubmit={handleSubmit}>

            {/* SOCIETY */}

            <div className="input-group">

              <label htmlFor="phone-society">
                Society
              </label>

              <select
                id="phone-society"
                value={societyId}
                onChange={(e) =>
                  setSocietyId(
                    e.target.value
                  )
                }
                disabled={
                  loadingData ||
                  loggingIn
                }
              >

                <option value="">
                  {loadingData
                    ? "Loading societies..."
                    : "Select Society"}
                </option>

                {societies.map(
                  (society) => (
                    <option
                      key={
                        society.Society_ID
                      }
                      value={
                        society.Society_ID
                      }
                    >
                      {
                        society.Society_Name
                      }
                    </option>
                  )
                )}

              </select>

            </div>

            {/* MOBILE */}

            <div className="input-group">

              <label htmlFor="mobile-number">
                Mobile Number
              </label>

              <div className="mobile-input-wrapper">

                <select
                  className="mobile-country-code"
                  value={countryCode}
                  onChange={(e) =>
                    setCountryCode(
                      e.target.value
                    )
                  }
                  disabled={
                    loadingData ||
                    loggingIn
                  }
                  aria-label="Country calling code"
                >

                  {countries.map(
                    (
                      country,
                      index
                    ) => (
                      <option
                        key={`${country.country_calling_Code}-${index}`}
                        value={
                          country.country_calling_Code
                        }
                      >
                        {
                          country.country_calling_Code
                        }
                      </option>
                    )
                  )}

                </select>

                <span className="mobile-divider"></span>

                <input
                  id="mobile-number"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter mobile number"
                  value={mobileNumber}
                  onChange={
                    handleMobileChange
                  }
                  disabled={loggingIn}
                  autoComplete="tel"
                  maxLength={15}
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <label htmlFor="phone-password">
                Password
              </label>

              <input
                id="phone-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                disabled={loggingIn}
                autoComplete="current-password"
              />

            </div>

            {/* ERROR */}

            {errorMessage && (
              <p className="login-error">
                {errorMessage}
              </p>
            )}

            {/* OPTIONS */}

            <div className="options">

              <label className="remember-option">

                <input
                  type="checkbox"
                  disabled={loggingIn}
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
                disabled={loggingIn}
              >
                Forgot password?
              </button>

            </div>

            {/* LOGIN */}

            <button
              type="submit"
              className="login-submit-button"
              disabled={
                loggingIn ||
                loadingData
              }
            >
              {loggingIn
                ? "Logging in..."
                : "Login"}
            </button>

            {/* EMAIL LOGIN */}

            <div className="alternate-login">

              <div className="alternate-divider">

                <span></span>

                <p>OR</p>

                <span></span>

              </div>

              <button
                type="button"
                className="login-method-link"
                onClick={
                  handleEmailLogin
                }
                disabled={loggingIn}
              >
                Login with email
              </button>

            </div>

          </form>

        </div>

        <p className="footer-text">
          Secure. Reliable. Built for Better Communities.
        </p>

      </div>

    </div>
  );
}

export default PhoneLogin;