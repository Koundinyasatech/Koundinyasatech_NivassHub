import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useDispatch,
} from "react-redux";

import {
  getProfileAPI,
  updateProfileAPI,
} from "../../features/auth/authAPI";

import {
  updateUser,
} from "../../features/auth/authSlice";

import axiosInstance from "../../services/axiosInstance";

import "./Profile.css";


function Profile() {
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const imageObjectUrlRef = useRef(null);


  /* =========================================================
     STATE
  ========================================================= */

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Mobile: "",
    Password: "",
  });


  /* =========================================================
     CLEAN BLOB URL
  ========================================================= */

  const cleanupImageObjectUrl = () => {
    if (imageObjectUrlRef.current) {
      URL.revokeObjectURL(
        imageObjectUrlRef.current
      );

      imageObjectUrlRef.current = null;
    }
  };


  /* =========================================================
     LOAD PROFILE IMAGE FROM BACKEND
  ========================================================= */

  const loadProfileImage = async (imageUrl) => {
    try {
      if (
        !imageUrl ||
        imageUrl === "NA"
      ) {
        cleanupImageObjectUrl();

        setImagePreview("");

        return;
      }


      console.log(
        "Backend profile image URL:",
        imageUrl
      );


      /*
      ---------------------------------------------------------
      IMPORTANT

      The backend is returning something like:

      http://localhost:3000/profile-pic/1786947644611_profile.png

      We load it through axios so authentication/session
      configuration from axiosInstance can be used.
      ---------------------------------------------------------
      */

      const response =
        await axiosInstance.get(
          imageUrl,
          {
            responseType: "blob",
          }
        );


      console.log(
        "Profile image response:",
        response
      );


      /*
      ---------------------------------------------------------
      Verify that the response is actually an image.
      ---------------------------------------------------------
      */

      if (
        !response?.data ||
        !(response.data instanceof Blob)
      ) {
        throw new Error(
          "Backend did not return a valid image."
        );
      }


      /*
      ---------------------------------------------------------
      Remove previous Blob URL.
      ---------------------------------------------------------
      */

      cleanupImageObjectUrl();


      /*
      ---------------------------------------------------------
      Create temporary browser URL.
      ---------------------------------------------------------
      */

      const objectUrl =
        URL.createObjectURL(
          response.data
        );


      imageObjectUrlRef.current =
        objectUrl;


      setImagePreview(
        objectUrl
      );

    } catch (error) {
      console.error(
        "Profile image loading failed:",
        error
      );

      console.error(
        "Profile image backend response:",
        error?.response?.data
      );

      cleanupImageObjectUrl();

      setImagePreview("");
    }
  };


  /* =========================================================
     GET PROFILE
  ========================================================= */

  const fetchProfile = async () => {
    try {
      setLoading(true);

      setErrorMessage("");

      console.log(
        "Fetching admin profile..."
      );


      const response =
        await getProfileAPI();


      console.log(
        "Get Profile response:",
        response
      );


      if (
        response?.Status !== 200
      ) {
        throw new Error(
          response?.Message ||
          "Unable to load profile."
        );
      }


      setProfile(response);


      const data =
        response?.Data || {};


      /*
      ---------------------------------------------------------
      FORM DATA
      ---------------------------------------------------------
      */

      setFormData({
        Name:
          data?.name || "",

        Email:
          data?.Email || "",

        Mobile:
          data?.Mobile_Number || "",

        Password:
          "",
      });


      /*
      ---------------------------------------------------------
      PROFILE IMAGE
      ---------------------------------------------------------
      */

      if (
        data?.Profile_Picture &&
        data.Profile_Picture !== "NA"
      ) {
        await loadProfileImage(
          data.Profile_Picture
        );
      } else {
        cleanupImageObjectUrl();

        setImagePreview("");
      }

    } catch (error) {
      console.error(
        "Get profile error:",
        error
      );

      console.error(
        "Backend response:",
        error?.response?.data
      );


      setErrorMessage(
        error?.response?.data?.Message ||
        error?.response?.data?.message ||
        error?.message ||
        "Unable to load profile."
      );

    } finally {
      setLoading(false);
    }
  };


  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    fetchProfile();

    return () => {
      cleanupImageObjectUrl();
    };
  }, []);


  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;


    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );


    setErrorMessage("");

    setSuccessMessage("");
  };


  /* =========================================================
     IMAGE SELECT
  ========================================================= */

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];


    if (!file) {
      return;
    }


    /*
    ---------------------------------------------------------
    IMAGE TYPE VALIDATION
    ---------------------------------------------------------
    */

    if (
      !file.type.startsWith("image/")
    ) {
      setErrorMessage(
        "Please select a valid image."
      );

      e.target.value = "";

      return;
    }


    /*
    ---------------------------------------------------------
    FILE SIZE VALIDATION
    ---------------------------------------------------------
    */

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setErrorMessage(
        "Profile image must be less than 5 MB."
      );

      e.target.value = "";

      return;
    }


    setErrorMessage("");

    setSuccessMessage("");


    setSelectedImage(file);


    /*
    ---------------------------------------------------------
    CREATE LOCAL PREVIEW
    ---------------------------------------------------------
    */

    cleanupImageObjectUrl();


    const previewUrl =
      URL.createObjectURL(file);


    imageObjectUrlRef.current =
      previewUrl;


    setImagePreview(
      previewUrl
    );
  };


  /* =========================================================
     REMOVE SELECTED IMAGE
  ========================================================= */

  const handleRemoveImage = () => {
    setSelectedImage(null);


    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value = "";
    }


    /*
    ---------------------------------------------------------
    Restore backend image
    ---------------------------------------------------------
    */

    const backendImage =
      profile?.Data?.Profile_Picture;


    if (
      backendImage &&
      backendImage !== "NA"
    ) {
      loadProfileImage(
        backendImage
      );
    } else {
      cleanupImageObjectUrl();

      setImagePreview("");
    }
  };


  /* =========================================================
     FILE -> BASE64
  ========================================================= */

  const convertImageToBase64 = (
    file
  ) => {
    return new Promise(
      (
        resolve,
        reject
      ) => {
        const reader =
          new FileReader();


        reader.onload = () => {
          resolve(
            reader.result
          );
        };


        reader.onerror = () => {
          reject(
            new Error(
              "Failed to read image."
            )
          );
        };


        reader.readAsDataURL(file);
      }
    );
  };


  /* =========================================================
     UPDATE PROFILE
  ========================================================= */

  const handleUpdateProfile =
    async (e) => {
      e.preventDefault();


      if (saving) {
        return;
      }


      try {
        setSaving(true);

        setErrorMessage("");

        setSuccessMessage("");


        const payload = {};


        /*
        =====================================================
        NAME
        =====================================================
        */

        const currentName =
          profile?.Data?.name || "";


        if (
          formData.Name.trim() !==
          currentName
        ) {
          payload.Name =
            formData.Name.trim();
        }


        /*
        =====================================================
        EMAIL
        =====================================================
        */

        const currentEmail =
          profile?.Data?.Email || "";


        if (
          formData.Email.trim() !==
          currentEmail
        ) {
          payload.Email =
            formData.Email.trim();
        }


        /*
        =====================================================
        MOBILE
        =====================================================
        */

        const currentMobile =
          profile?.Data?.Mobile_Number ||
          "";


        if (
          formData.Mobile.trim() !==
          currentMobile
        ) {
          payload.Mobile =
            formData.Mobile.trim();
        }


        /*
        =====================================================
        PASSWORD
        =====================================================
        */

        if (
          formData.Password.trim()
        ) {
          payload.Password =
            formData.Password;
        }


        /*
        =====================================================
        PROFILE IMAGE
        =====================================================
        */

        if (selectedImage) {
          const base64Image =
            await convertImageToBase64(
              selectedImage
            );


          payload.ProfilePic =
            base64Image;
        }


        /*
        =====================================================
        NOTHING CHANGED
        =====================================================
        */

        if (
          Object.keys(payload)
            .length === 0
        ) {
          setSuccessMessage(
            "No changes to update."
          );

          setEditing(false);

          return;
        }


        console.log(
          "Update profile payload:",
          payload
        );


        /*
        =====================================================
        UPDATE API
        =====================================================
        */

        const response =
          await updateProfileAPI(
            payload
          );


        console.log(
          "Update profile response:",
          response
        );


        /*
        =====================================================
        SUCCESS
        =====================================================
        */

        if (
          response?.Status === 200
        ) {
          setSuccessMessage(
            response?.Message ||
            "Profile updated successfully."
          );


          /*
          ---------------------------------------------------
          Refresh actual backend profile.
          ---------------------------------------------------
          */

          await fetchProfile();


          /*
          ---------------------------------------------------
          Update Redux user.
          ---------------------------------------------------
          */

          const updatedProfile =
            response?.Data ||
            profile?.Data ||
            {};


          dispatch(
            updateUser({
              UserId:
                updatedProfile?.user_id ||
                profile?.Data?.user_id,

              Name:
                formData.Name.trim(),

              Email:
                formData.Email.trim(),

              Mobile:
                formData.Mobile.trim(),
            })
          );


          setSelectedImage(null);


          if (
            fileInputRef.current
          ) {
            fileInputRef.current.value =
              "";
          }


          setFormData(
            (previous) => ({
              ...previous,
              Password: "",
            })
          );


          setEditing(false);

        } else {
          setErrorMessage(
            response?.Message ||
            "Profile update failed."
          );
        }

      } catch (error) {
        console.error(
          "Update profile error:",
          error
        );

        console.error(
          "Backend update response:",
          error?.response?.data
        );


        setErrorMessage(
          error?.response?.data?.Message ||
          error?.response?.data?.message ||
          error?.message ||
          "Unable to update profile."
        );

      } finally {
        setSaving(false);
      }
    };


  /* =========================================================
     CANCEL EDIT
  ========================================================= */

  const handleCancelEdit = () => {
    setEditing(false);

    setSelectedImage(null);

    setErrorMessage("");

    setSuccessMessage("");


    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }


    /*
    ---------------------------------------------------------
    Restore original form values.
    ---------------------------------------------------------
    */

    setFormData({
      Name:
        profile?.Data?.name || "",

      Email:
        profile?.Data?.Email || "",

      Mobile:
        profile?.Data?.Mobile_Number ||
        "",

      Password: "",
    });


    /*
    ---------------------------------------------------------
    Restore backend image.
    ---------------------------------------------------------
    */

    const backendImage =
      profile?.Data?.Profile_Picture;


    if (
      backendImage &&
      backendImage !== "NA"
    ) {
      loadProfileImage(
        backendImage
      );
    } else {
      cleanupImageObjectUrl();

      setImagePreview("");
    }
  };


  /* =========================================================
     ROLE
  ========================================================= */

  const getRoleName = () => {
    try {
      const authData =
        JSON.parse(
          sessionStorage.getItem(
            "authUser"
          ) || "null"
        );


      if (
        authData?.Role_Name ===
        "SA"
      ) {
        return "Super Admin";
      }


      return (
        authData?.Role_Name ||
        "Administrator"
      );

    } catch {
      return "Administrator";
    }
  };


  /* =========================================================
     AVATAR INITIALS
  ========================================================= */

  const getInitials = () => {
    const currentName =
      profile?.Data?.name || "";


    if (!currentName.trim()) {
      return "AD";
    }


    const words =
      currentName
        .trim()
        .split(/\s+/);


    if (
      words.length >= 2
    ) {
      return (
        words[0][0] +
        words[1][0]
      ).toUpperCase();
    }


    return currentName
      .substring(0, 2)
      .toUpperCase();
  };


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="profile-page">

        <div className="profile-loading">

          <div className="profile-spinner"></div>

          <span>
            Loading profile...
          </span>

        </div>

      </div>
    );
  }


  /* =========================================================
     ERROR PAGE
  ========================================================= */

  if (
    errorMessage &&
    !profile
  ) {
    return (
      <div className="profile-page">

        <div className="profile-error">

          <h2>
            Unable to Load Profile
          </h2>

          <p>
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={fetchProfile}
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }


  /* =========================================================
     PROFILE DATA
  ========================================================= */

  const data =
    profile?.Data || {};


  const userId =
    data?.user_id || "-";


  const name =
    data?.name || "-";


  const email =
    data?.Email || "-";


  const mobile =
    data?.Mobile_Number || "-";


  const countryCode =
    data?.mobile_Country_Code || "";


  const role =
    getRoleName();


  const profilePicture =
    imagePreview || "";


  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="profile-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="profile-page-header">

        <div>

          <h1>
            My Profile
          </h1>

          <p>
            View and manage your account information
          </p>

        </div>

      </div>


      {/* =====================================================
          SUCCESS MESSAGE
      ===================================================== */}

      {successMessage && (
        <div className="profile-success">
          {successMessage}
        </div>
      )}


      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      {errorMessage && (
        <div className="profile-error-message">
          {errorMessage}
        </div>
      )}


      {/* =====================================================
          PROFILE HERO
      ===================================================== */}

      <div className="profile-hero-card">

        <div className="profile-hero-left">

          {/* =================================================
              PROFILE IMAGE
          ================================================= */}

          <div className="profile-image-wrapper">

            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Admin Profile"
                className="profile-image"
                onError={(e) => {
                  console.error(
                    "Profile image failed to render."
                  );

                  e.currentTarget.style.display =
                    "none";

                  const fallback =
                    e.currentTarget
                      .nextElementSibling;

                  if (fallback) {
                    fallback.style.display =
                      "flex";
                  }
                }}
              />
            ) : null}


            {/* =================================================
                FALLBACK AVATAR
            ================================================= */}

            <div
              className="profile-image-fallback"
              style={{
                display:
                  profilePicture
                    ? "none"
                    : "flex",
              }}
            >
              {getInitials()}
            </div>


            {/* =================================================
                CHANGE PHOTO
            ================================================= */}

            {editing && (
              <>
                <button
                  type="button"
                  className="change-photo-button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                >
                  Change Photo
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={
                    handleImageChange
                  }
                  className="profile-image-input"
                />
              </>
            )}

          </div>


          {/* =================================================
              PROFILE INFORMATION
          ================================================= */}

          <div className="profile-hero-info">

            <h2>
              {name}
            </h2>

            <p className="profile-role">
              {role}
            </p>

            <span className="profile-location">
              NivasHub Admin Portal
            </span>

          </div>

        </div>


        {/* =================================================
            EDIT BUTTON
        ================================================= */}

        {!editing && (
          <button
            type="button"
            className="profile-edit-button"
            onClick={() => {
              setEditing(true);

              setSuccessMessage("");

              setErrorMessage("");
            }}
          >
            <span>
              Edit
            </span>

            <span className="edit-icon">
              ✎
            </span>

          </button>
        )}

      </div>


      {/* =====================================================
          PERSONAL INFORMATION
      ===================================================== */}

      {!editing && (
        <div className="profile-section">

          <div className="profile-section-header">

            <div>

              <h2>
                Personal Information
              </h2>

            </div>

            <button
              type="button"
              className="section-edit-button"
              onClick={() => {
                setEditing(true);

                setSuccessMessage("");

                setErrorMessage("");
              }}
            >
              Edit
              <span>
                ✎
              </span>
            </button>

          </div>


          <div className="profile-information-grid">

            {/* NAME */}

            <div className="profile-information-item">

              <span className="profile-information-label">
                Name
              </span>

              <span className="profile-information-value">
                {name}
              </span>

            </div>


            {/* EMAIL */}

            <div className="profile-information-item">

              <span className="profile-information-label">
                Email Address
              </span>

              <span className="profile-information-value">
                {email}
              </span>

            </div>


            {/* MOBILE */}

            <div className="profile-information-item">

              <span className="profile-information-label">
                Phone Number
              </span>

              <span className="profile-information-value">
                {countryCode}{" "}
                {mobile}
              </span>

            </div>


            {/* ROLE */}

            <div className="profile-information-item">

              <span className="profile-information-label">
                User Role
              </span>

              <span className="profile-information-value">
                {role}
              </span>

            </div>


            {/* USER ID */}

            <div className="profile-information-item">

              <span className="profile-information-label">
                User ID
              </span>

              <span className="profile-information-value">
                {userId}
              </span>

            </div>


            {/* COUNTRY CODE */}

            <div className="profile-information-item">

              <span className="profile-information-label">
                Country Code
              </span>

              <span className="profile-information-value">
                {countryCode || "-"}
              </span>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          EDIT FORM
      ===================================================== */}

      {editing && (
        <form
          className="profile-section"
          onSubmit={
            handleUpdateProfile
          }
        >

          <div className="profile-section-header">

            <div>

              <h2>
                Personal Information
              </h2>

              <p>
                Update your account information
              </p>

            </div>

          </div>


          <div className="profile-edit-grid">

            {/* USER ID */}

            <div className="profile-field">

              <label>
                User ID
              </label>

              <div className="profile-value disabled-value">
                {userId}
              </div>

            </div>


            {/* NAME */}

            <div className="profile-field">

              <label htmlFor="Name">
                Name
              </label>

              <input
                id="Name"
                name="Name"
                type="text"
                value={
                  formData.Name
                }
                onChange={
                  handleChange
                }
              />

            </div>


            {/* EMAIL */}

            <div className="profile-field">

              <label htmlFor="Email">
                Email Address
              </label>

              <input
                id="Email"
                name="Email"
                type="email"
                value={
                  formData.Email
                }
                onChange={
                  handleChange
                }
              />

            </div>


            {/* MOBILE */}

            <div className="profile-field">

              <label htmlFor="Mobile">
                Phone Number
              </label>

              <div className="mobile-input-wrapper">

                <span className="country-code-display">
                  {countryCode || "+91"}
                </span>

                <input
                  id="Mobile"
                  name="Mobile"
                  type="tel"
                  value={
                    formData.Mobile
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="profile-field">

              <label htmlFor="Password">
                New Password
              </label>

              <input
                id="Password"
                name="Password"
                type="password"
                placeholder="Leave blank to keep current password"
                value={
                  formData.Password
                }
                onChange={
                  handleChange
                }
              />

            </div>


            {/* PROFILE PICTURE */}

            <div className="profile-field">

              <label>
                Profile Picture
              </label>

              <div className="profile-upload-box">

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={
                    handleImageChange
                  }
                />

                {selectedImage && (
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={
                      handleRemoveImage
                    }
                  >
                    Remove
                  </button>
                )}

              </div>

            </div>

          </div>


          {/* =================================================
              FORM ACTIONS
          ================================================= */}

          <div className="profile-form-actions">

            <button
              type="button"
              className="cancel-profile-button"
              disabled={saving}
              onClick={
                handleCancelEdit
              }
            >
              Cancel
            </button>


            <button
              type="submit"
              className="save-profile-button"
              disabled={saving}
            >
              {saving
                ? "Updating..."
                : "Update Profile"}
            </button>

          </div>

        </form>
      )}

    </div>
  );
}


export default Profile;