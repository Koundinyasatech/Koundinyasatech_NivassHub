import "./ForgotPassword.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginBg from "../../assets/login-bg.jpg";

import {
  forgotPasswordAPI,
} from "../../features/auth/authAPI";


function ForgotPassword() {

  const [identifier, setIdentifier] = useState("");

  const [countryCode, setCountryCode] =
    useState("+91");

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const navigate = useNavigate();


  /* =====================================================
     IDENTIFIER TYPE
  ===================================================== */

  const isMobileNumber = (value) => {
    const cleanedValue =
      value.replace(/\s+/g, "");

    return /^[0-9]{7,15}$/.test(
      cleanedValue
    );
  };


  const isEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value
    );
  };


  /* =====================================================
     STEP 1 - REQUEST OTP
  ===================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setErrorMessage("");

    const trimmedIdentifier =
      identifier.trim();

    if (!trimmedIdentifier) {

      setErrorMessage(
        "Please enter your registered email address or mobile number."
      );

      return;
    }


    const mobile =
      isMobileNumber(trimmedIdentifier);

    const email =
      isEmail(trimmedIdentifier);


    if (!mobile && !email) {

      setErrorMessage(
        "Please enter a valid email address or mobile number."
      );

      return;
    }


    if (mobile && !countryCode) {

      setErrorMessage(
        "Please select your mobile country code."
      );

      return;
    }


    try {

      setLoading(true);


      const payload = {
        umail: trimmedIdentifier,

        action: "GENERATE",
      };


      /*
       * Country code is required
       * only for mobile number.
       */

      if (mobile) {

        payload.mob_country_code =
          countryCode;
      }


      console.log(
        "Forgot Password STEP 1 payload:",
        payload
      );


      const response =
        await forgotPasswordAPI(
          payload
        );


      console.log(
        "Forgot Password STEP 1 response:",
        response
      );


      /* =================================================
         SUCCESS
      ================================================= */

      if (
        response?.Status === 200
      ) {

        const fpToken =
          response?.FP_Token;


        if (!fpToken) {

          setErrorMessage(
            "OTP request succeeded, but the reset token was not returned."
          );

          return;
        }


        /*
         * IMPORTANT:
         *
         * Backend currently has a mismatch:
         *
         * Identifier
         * OTP_Type
         *
         * Do NOT blindly map these values.
         *
         * We carry the raw values forward so
         * they can be corrected once Backend
         * confirms the contract.
         */

        navigate(
          "/forgot-password/verify-otp",
          {
            state: {

              identifier:
                trimmedIdentifier,

              mob_country_code:
                mobile
                  ? countryCode
                  : "",

              FP_Token:
                fpToken,

              /*
               * Keep raw backend values.
               * Do not assume their meaning.
               */

              backendIdentifier:
                response?.Identifier,

              backendOTPType:
                response?.OTP_Type,

            },
          }
        );

        return;
      }


      /* =================================================
         BACKEND ERROR
      ================================================= */

      setErrorMessage(
        response?.Message ||
        "Unable to send OTP. Please try again."
      );

    } catch (error) {

      console.error(
        "Forgot Password STEP 1 error:",
        error
      );


      const backendData =
        error?.response?.data;


      if (
        backendData?.Status === 429
      ) {

        setErrorMessage(
          backendData?.Message ||
          "Please wait before requesting another OTP."
        );

        return;
      }


      setErrorMessage(
        backendData?.Message ||
        error?.message ||
        "Unable to process your request. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  /* =====================================================
     BACK TO LOGIN
  ===================================================== */

  const handleBackToLogin = () => {

    setErrorMessage("");

    navigate("/login");

  };


  return (

    <div className="forgot-password-page">

      {/* =================================================
          LEFT SECTION
      ================================================= */}

      <div
        className="forgot-password-left"
        style={{
          backgroundImage:
            `url(${loginBg})`,
        }}
      >

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
              Secure Your Account.
              <br />
              Get Back In.
            </h2>

            <p className="hero-text">
              Enter your registered email address
              or mobile number to receive a
              verification OTP.
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

      <div className="forgot-password-right">

        <div className="forgot-password-card">

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
            Forgot Password?
          </h1>


          <p className="forgot-description">

            Enter your registered email address
            or mobile number and we'll send you
            an OTP.

          </p>


          <form
            onSubmit={handleSubmit}
          >

            {/* IDENTIFIER */}

            <div className="input-group">

              <label htmlFor="forgot-identifier">

                Email or Mobile Number

              </label>


              <input
                id="forgot-identifier"
                type="text"
                placeholder="Enter email or mobile number"
                value={identifier}
                onChange={(e) =>
                  setIdentifier(
                    e.target.value
                  )
                }
                disabled={loading}
                autoComplete="username"
              />

            </div>


            {/* COUNTRY CODE */}

            {isMobileNumber(
              identifier.trim()
            ) && (

              <div className="input-group">

                <label htmlFor="country-code">

                  Mobile Country Code

                </label>


                <select
                  id="country-code"
                  value={countryCode}
                  onChange={(e) =>
                    setCountryCode(
                      e.target.value
                    )
                  }
                  disabled={loading}
                >

                  <option value="+91">
                    +91 India
                  </option>

                  <option value="+1">
                    +1 USA / Canada
                  </option>

                  <option value="+44">
                    +44 United Kingdom
                  </option>

                  <option value="+61">
                    +61 Australia
                  </option>

                  <option value="+971">
                    +971 UAE
                  </option>

                </select>

              </div>

            )}


            {/* ERROR */}

            {errorMessage && (

              <p className="login-error">

                {errorMessage}

              </p>

            )}


            {/* SEND OTP */}

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >

              {loading
                ? "Sending OTP..."
                : "Send OTP"}

            </button>


            {/* BACK */}

            <div className="alternate-login">

              <button
                type="button"
                className="login-method-link"
                onClick={
                  handleBackToLogin
                }
                disabled={loading}
              >

                Back to Login

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


export default ForgotPassword;