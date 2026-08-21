import "./VerifyOTP.css";

import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import loginBg from "../../assets/login-bg.jpg";

import {
  verifyForgotPasswordOTPAPI,
  resendForgotPasswordOTPAPI,
} from "../../features/auth/authAPI";


function VerifyOTP() {

  const navigate = useNavigate();

  const location = useLocation();


  /* =========================================================
     STATE FROM STEP 1
  ========================================================= */

  const state =
    location.state || {};


  const [identifier] =
    useState(
      state.identifier || ""
    );


  const [countryCode] =
    useState(
      state.mob_country_code || ""
    );


  /*
   * IMPORTANT:
   *
   * Step 1 gives us FP_Token.
   *
   * We keep it internally as fpToken.
   */

  const [fpToken, setFpToken] =
    useState(
      state.FP_Token ||
      state.fpToken ||
      ""
    );


  const [backendIdentifier] =
    useState(
      state.backendIdentifier || ""
    );


  const [backendOTPType] =
    useState(
      state.backendOTPType || ""
    );


  const [otp, setOtp] =
    useState("");


  const [loading, setLoading] =
    useState(false);


  const [resending, setResending] =
    useState(false);


  const [errorMessage, setErrorMessage] =
    useState("");


  const [successMessage, setSuccessMessage] =
    useState("");


  const [resendAttempts, setResendAttempts] =
    useState(0);


  const [countdown, setCountdown] =
    useState(0);


  /* =========================================================
     CHECK STEP 1 DATA
  ========================================================= */

  useEffect(() => {

    if (
      !identifier ||
      !fpToken
    ) {

      navigate(
        "/forgot-password",
        {
          replace: true,
        }
      );
    }

  }, [
    identifier,
    fpToken,
    navigate,
  ]);


  /* =========================================================
     COUNTDOWN
  ========================================================= */

  useEffect(() => {

    if (
      countdown <= 0
    ) {
      return;
    }


    const timer =
      setInterval(() => {

        setCountdown(
          (previous) =>
            previous > 0
              ? previous - 1
              : 0
        );

      }, 1000);


    return () =>
      clearInterval(timer);

  }, [
    countdown,
  ]);


  /* =========================================================
     RESTART FLOW
  ========================================================= */

  const restartFlow = () => {

    navigate(
      "/forgot-password",
      {
        replace: true,
      }
    );
  };


  /* =========================================================
     VERIFY OTP
  ========================================================= */

  const handleVerifyOTP =
    async (e) => {

      e.preventDefault();


      setErrorMessage("");
      setSuccessMessage("");


      /* -----------------------------------------------------
         OTP VALIDATION
      ----------------------------------------------------- */

      if (
        !otp.trim()
      ) {

        setErrorMessage(
          "OTP is required."
        );

        return;
      }


      if (
        !/^\d{4,8}$/.test(
          otp.trim()
        )
      ) {

        setErrorMessage(
          "Please enter a valid OTP."
        );

        return;
      }


      /* -----------------------------------------------------
         FP TOKEN VALIDATION
      ----------------------------------------------------- */

      if (!fpToken) {

        setErrorMessage(
          "Your reset session is invalid. Please restart."
        );

        return;
      }


      /* -----------------------------------------------------
         VERIFY OTP PAYLOAD
      ----------------------------------------------------- */

      const payload = {

        otp:
          otp.trim(),

        FP_Token:
          fpToken,

        identifier:
          backendIdentifier,

        OTP_Type:
          backendOTPType,
      };


      try {

        setLoading(true);


        console.log(
          "Verify OTP payload:",
          {
            ...payload,

            /*
             * Do not expose sensitive
             * token in production logs.
             */
            FP_Token: "***",
          }
        );


        const response =
          await verifyForgotPasswordOTPAPI(
            payload
          );


        console.log(
          "Verify OTP response:",
          response
        );


        /* ===================================================
           SUCCESS
        =================================================== */

        if (
          response?.Status === 200
        ) {

          /*
           * Backend returns the NEW
           * FP_Token after OTP verification.
           */

          const rotatedToken =
            response?.FP_Token;


          if (!rotatedToken) {

            setErrorMessage(
              "OTP verified, but the reset token was not returned by the server."
            );

            return;
          }


          /*
           * Replace old token.
           */

          setFpToken(
            rotatedToken
          );


          /*
           * IMPORTANT
           *
           * Pass EXACTLY the same property name
           * that ResetPassword reads:
           *
           * fpToken
           */

          navigate(
            "/forgot-password/reset-password",
            {
              replace: true,

              state: {

                fpToken:
                  rotatedToken,

                identifier:
                  identifier,
              },
            }
          );


          return;
        }


        /* ===================================================
           BACKEND RETURNED ERROR
        =================================================== */

        setErrorMessage(
          response?.Message ||
          "Invalid OTP. Please try again."
        );

      } catch (error) {

        console.error(
          "Verify OTP error:",
          error
        );


        const backendData =
          error?.response?.data;


        const status =
          backendData?.Status ||
          error?.response?.status;


        console.error(
          "Verify OTP backend response:",
          backendData
        );


        /* ---------------------------------------------------
           400
        --------------------------------------------------- */

        if (
          status === 400
        ) {

          setErrorMessage(
            backendData?.Message ||
            "Invalid or expired OTP. Please request a new OTP."
          );

          return;
        }


        /* ---------------------------------------------------
           401
        --------------------------------------------------- */

        if (
          status === 401
        ) {

          setErrorMessage(
            backendData?.Message ||
            "Your reset session is invalid. Please restart the Forgot Password process."
          );

          return;
        }


        /* ---------------------------------------------------
           403
        --------------------------------------------------- */

        if (
          status === 403
        ) {

          setErrorMessage(
            backendData?.Message ||
            "Your account is not eligible for password reset."
          );

          return;
        }


        /* ---------------------------------------------------
           404
        --------------------------------------------------- */

        if (
          status === 404
        ) {

          setErrorMessage(
            backendData?.Message ||
            "Reset session was not found. Please restart the Forgot Password process."
          );

          return;
        }


        /* ---------------------------------------------------
           DEFAULT
        --------------------------------------------------- */

        setErrorMessage(
          backendData?.Message ||
          backendData?.message ||
          "Unable to verify OTP. Please try again."
        );

      } finally {

        setLoading(false);
      }
    };


  /* =========================================================
     RESEND OTP
  ========================================================= */

  const handleResendOTP =
    async () => {

      setErrorMessage("");
      setSuccessMessage("");


      if (
        countdown > 0
      ) {
        return;
      }


      if (
        resendAttempts >= 5
      ) {

        setErrorMessage(
          "Maximum resend attempts reached. Please request a new OTP."
        );

        return;
      }


      try {

        setResending(true);


        const payload = {

          umail:
            identifier,

          action:
            "RESEND",
        };


        if (
          countryCode
        ) {

          payload.mob_country_code =
            countryCode;
        }


        console.log(
          "Resend OTP payload:",
          payload
        );


        const response =
          await resendForgotPasswordOTPAPI(
            payload
          );


        console.log(
          "Resend OTP response:",
          response
        );


        /* ===================================================
           RESEND SUCCESS
        =================================================== */

        if (
          response?.Status === 200
        ) {

          /*
           * If backend rotates FP_Token,
           * replace the old one.
           */

          if (
            response?.FP_Token
          ) {

            setFpToken(
              response.FP_Token
            );
          }


          setResendAttempts(
            (previous) =>
              previous + 1
          );


          setOtp("");


          setSuccessMessage(
            response?.Message ||
            "OTP resent successfully."
          );


          return;
        }


        /* ===================================================
           429
        =================================================== */

        if (
          response?.Status === 429
        ) {

          const retrySeconds =
            Number(
              response?.RetryAfterSeconds
            ) || 0;


          if (
            retrySeconds > 0
          ) {

            setCountdown(
              retrySeconds
            );
          }


          setErrorMessage(
            response?.Message ||
            "Please wait before requesting another OTP."
          );

          return;
        }


        setErrorMessage(
          response?.Message ||
          "Unable to resend OTP."
        );

      } catch (error) {

        console.error(
          "Resend OTP error:",
          error
        );


        const backendData =
          error?.response?.data;


        const status =
          backendData?.Status ||
          error?.response?.status;


        if (
          status === 429
        ) {

          const retrySeconds =
            Number(
              backendData?.RetryAfterSeconds
            ) || 0;


          if (
            retrySeconds > 0
          ) {

            setCountdown(
              retrySeconds
            );
          }
        }


        setErrorMessage(
          backendData?.Message ||
          backendData?.message ||
          "Unable to resend OTP. Please try again."
        );

      } finally {

        setResending(false);
      }
    };


  /* =========================================================
     MASK IDENTIFIER
  ========================================================= */

  const maskedIdentifier =
    identifier.includes("@")
      ? identifier
      : `******${identifier.slice(-4)}`;


  /* =========================================================
     UI
  ========================================================= */

  return (

    <div className="forgot-password-page">


      {/* =====================================================
          LEFT
      ===================================================== */}

      <div
        className="forgot-password-left"
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
              Verify Your Identity.
              <br />
              Stay Secure.
            </h2>

            <p className="hero-text">
              Enter the verification code sent
              to your registered contact.
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
          RIGHT
      ===================================================== */}

      <div className="forgot-password-right">


        <div className="forgot-password-card">


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
            Verify OTP
          </h1>


          <p className="forgot-description">

            Enter the OTP sent to

            <br />

            <strong>
              {maskedIdentifier}
            </strong>

          </p>


          <form
            onSubmit={
              handleVerifyOTP
            }
          >


            <div className="input-group">

              <label htmlFor="otp">
                Verification Code
              </label>


              <input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={8}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                      .replace(/\D/g, "")
                  )
                }
                disabled={
                  loading ||
                  resending
                }
                autoComplete="one-time-code"
              />

            </div>


            {errorMessage && (

              <p className="login-error">
                {errorMessage}
              </p>

            )}


            {successMessage && (

              <p className="otp-success">
                {successMessage}
              </p>

            )}


            <button
              type="submit"
              className="login-submit-button"
              disabled={
                loading ||
                resending
              }
            >

              {loading
                ? "Verifying..."
                : "Verify OTP"}

            </button>


            {/* RESEND */}

            <div className="alternate-login">

              {countdown > 0 ? (

                <p className="otp-resend-text">

                  Resend OTP in{" "}

                  <strong>
                    {countdown}s
                  </strong>

                </p>

              ) : (

                <button
                  type="button"
                  className="login-method-link"
                  onClick={
                    handleResendOTP
                  }
                  disabled={
                    resending ||
                    resendAttempts >= 5
                  }
                >

                  {resending
                    ? "Resending..."
                    : resendAttempts >= 5
                      ? "Resend limit reached"
                      : "Resend OTP"}

                </button>

              )}

            </div>


            {/* START OVER */}

            <div className="alternate-login">

              <button
                type="button"
                className="login-method-link"
                onClick={
                  restartFlow
                }
                disabled={
                  loading ||
                  resending
                }
              >
                Start Over
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


export default VerifyOTP;