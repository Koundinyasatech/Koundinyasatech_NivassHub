import "./ResetPassword.css";

import {
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import loginBg from "../../assets/login-bg.jpg";

import {
  resetPasswordAPI,
} from "../../features/auth/authAPI";


function ResetPassword() {

  const navigate = useNavigate();

  const location = useLocation();


  /* =========================================================
     GET FP TOKEN FROM VERIFY OTP

     New code uses:
     fpToken

     Old code may have:
     FP_Token

     Support both so the flow does not break.
  ========================================================= */

  const fpToken =
    location.state?.fpToken ||
    location.state?.FP_Token ||
    "";


  const [newPassword, setNewPassword] =
    useState("");


  const [confirmPassword, setConfirmPassword] =
    useState("");


  const [loading, setLoading] =
    useState(false);


  const [errorMessage, setErrorMessage] =
    useState("");


  const [successMessage, setSuccessMessage] =
    useState("");


  const [showPassword, setShowPassword] =
    useState(false);


  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  /* =========================================================
     PASSWORD VALIDATION
     
     Backend requirements:
     - Minimum 10 characters
     - Uppercase
     - Lowercase
     - Number
     - Special character
  ========================================================= */

  const validatePassword = () => {

    if (
      !newPassword
    ) {

      return (
        "Please enter your new password."
      );
    }


    if (
      newPassword.length < 10
    ) {

      return (
        "Password must be at least 10 characters and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
    }


    if (
      !/[A-Z]/.test(
        newPassword
      )
    ) {

      return (
        "Password must contain at least one uppercase letter."
      );
    }


    if (
      !/[a-z]/.test(
        newPassword
      )
    ) {

      return (
        "Password must contain at least one lowercase letter."
      );
    }


    if (
      !/[0-9]/.test(
        newPassword
      )
    ) {

      return (
        "Password must contain at least one number."
      );
    }


    if (
      !/[^A-Za-z0-9]/.test(
        newPassword
      )
    ) {

      return (
        "Password must contain at least one special character."
      );
    }


    if (
      !confirmPassword
    ) {

      return (
        "Please confirm your new password."
      );
    }


    if (
      newPassword !==
      confirmPassword
    ) {

      return (
        "Passwords do not match."
      );
    }


    return "";
  };


  /* =========================================================
     RESET PASSWORD
  ========================================================= */

  const handleSubmit =
    async (e) => {

      e.preventDefault();


      setErrorMessage("");
      setSuccessMessage("");


      /* =====================================================
         CHECK FP TOKEN
      ===================================================== */

      if (!fpToken) {

        setErrorMessage(
          "Your password reset session is invalid or expired. Please restart the Forgot Password process."
        );

        return;
      }


      /* =====================================================
         PASSWORD VALIDATION
      ===================================================== */

      const validationError =
        validatePassword();


      if (
        validationError
      ) {

        setErrorMessage(
          validationError
        );

        return;
      }


      try {

        setLoading(true);


        /* ===================================================
           EXACT BACKEND PAYLOAD

           {
             "FP_Token": "...",
             "NewPassword": "NewPass@2026"
           }
        =================================================== */

        const payload = {

          FP_Token:
            fpToken,

          NewPassword:
            newPassword,
        };


        console.log(
          "Reset Password request:",
          {
            FP_Token:
              "***",

            NewPassword:
              "***",
          }
        );


        /* ===================================================
           API
        =================================================== */

        const response =
          await resetPasswordAPI(
            payload
          );


        console.log(
          "Reset Password response:",
          response
        );


        /* ===================================================
           SUCCESS
        =================================================== */

        if (
          response?.Status === 200
        ) {

          setNewPassword("");

          setConfirmPassword("");


          setSuccessMessage(
            response?.Message ||
            "Password updated successfully."
          );


          /*
           * Redirect to login.
           */

          setTimeout(() => {

            navigate(
              "/login",
              {
                replace: true,
              }
            );

          }, 1500);


          return;
        }


        /* ===================================================
           BACKEND ERROR RESPONSE
        =================================================== */

        setErrorMessage(
          response?.Message ||
          response?.message ||
          "Unable to update password."
        );

      } catch (error) {

        console.error(
          "Reset Password error:",
          error
        );


        const backendData =
          error?.response?.data;


        const status =
          error?.response?.status;


        console.error(
          "Reset Password backend response:",
          backendData
        );


        /* ===================================================
           400
        =================================================== */

        if (
          status === 400
        ) {

          setErrorMessage(
            backendData?.Message ||
            backendData?.message ||
            "Password must be at least 10 characters and include an uppercase letter, a lowercase letter, a number, and a special character."
          );

          return;
        }


        /* ===================================================
           401
        =================================================== */

        if (
          status === 401
        ) {

          setErrorMessage(
            backendData?.Message ||
            backendData?.message ||
            "This reset token is invalid or has already been used. Please restart the process."
          );

          return;
        }


        /* ===================================================
           403
        =================================================== */

        if (
          status === 403
        ) {

          setErrorMessage(
            backendData?.Message ||
            backendData?.message ||
            "User is not an active administrator."
          );

          return;
        }


        /* ===================================================
           410
        =================================================== */

        if (
          status === 410
        ) {

          setErrorMessage(
            backendData?.Message ||
            backendData?.message ||
            "This reset session has expired. Please restart the process."
          );

          return;
        }


        /* ===================================================
           500
        =================================================== */

        if (
          status === 500
        ) {

          setErrorMessage(
            backendData?.Message ||
            backendData?.message ||
            "Unexpected server error. Please try again later."
          );

          return;
        }


        /* ===================================================
           OTHER ERROR
        =================================================== */

        setErrorMessage(
          backendData?.Message ||
          backendData?.message ||
          "Unable to update password. Please try again."
        );

      } finally {

        setLoading(false);
      }
    };


  /* =========================================================
     BACK TO LOGIN
  ========================================================= */

  const handleBackToLogin = () => {

    navigate(
      "/login"
    );
  };


  /* =========================================================
     RESTART
  ========================================================= */

  const handleRestart = () => {

    navigate(
      "/forgot-password",
      {
        replace: true,
      }
    );
  };


  /* =========================================================
     UI
  ========================================================= */

  return (

    <div className="reset-password-page">


      {/* =====================================================
          LEFT SECTION
      ===================================================== */}

      <div
        className="reset-password-left"
        style={{
          backgroundImage:
            `url(${loginBg})`,
        }}
      >

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
              Create a New Password.
              <br />
              Stay Secure.
            </h2>

            <p className="hero-text">
              Choose a strong password to
              protect your NivassHub account.
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


      {/* =====================================================
          RIGHT SECTION
      ===================================================== */}

      <div className="reset-password-right">


        <div className="reset-password-card">


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
            Reset Password
          </h1>


          <p className="reset-description">
            Enter a new password for your account.
          </p>


          <form
            onSubmit={
              handleSubmit
            }
          >


            {/* =================================================
                NEW PASSWORD
            ================================================= */}

            <div className="input-group">

              <label htmlFor="new-password">
                New Password
              </label>


              <div className="password-input-wrapper">

                <input
                  id="new-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  disabled={
                    loading
                  }
                  autoComplete="new-password"
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
                    loading
                  }
                >

                  {showPassword
                    ? "Hide"
                    : "Show"}

                </button>

              </div>

            </div>


            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <div className="input-group">

              <label htmlFor="confirm-password">
                Confirm Password
              </label>


              <div className="password-input-wrapper">

                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  disabled={
                    loading
                  }
                  autoComplete="new-password"
                />


                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  disabled={
                    loading
                  }
                >

                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}

                </button>

              </div>

            </div>


            {/* =================================================
                PASSWORD REQUIREMENTS
            ================================================= */}

            <div className="password-hint">

              <p>
                Password must contain:
              </p>


              <ul>

                <li>
                  At least 10 characters
                </li>

                <li>
                  At least one uppercase letter
                </li>

                <li>
                  At least one lowercase letter
                </li>

                <li>
                  At least one number
                </li>

                <li>
                  At least one special character
                </li>

              </ul>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {errorMessage && (

              <p className="login-error">
                {errorMessage}
              </p>

            )}


            {/* =================================================
                SUCCESS
            ================================================= */}

            {successMessage && (

              <p className="reset-success">
                {successMessage}
              </p>

            )}


            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              type="submit"
              className="login-submit-button"
              disabled={
                loading
              }
            >

              {loading
                ? "Updating Password..."
                : "Reset Password"}

            </button>


            {/* =================================================
                START AGAIN
            ================================================= */}

            <div className="alternate-login">

              <button
                type="button"
                className="login-method-link"
                onClick={
                  handleRestart
                }
                disabled={
                  loading
                }
              >
                Start Again
              </button>

            </div>


            {/* =================================================
                BACK TO LOGIN
            ================================================= */}

            <div className="alternate-login">

              <button
                type="button"
                className="login-method-link"
                onClick={
                  handleBackToLogin
                }
                disabled={
                  loading
                }
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


export default ResetPassword;