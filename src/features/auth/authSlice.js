import { createSlice } from "@reduxjs/toolkit";


/* =========================================================
   INITIAL STATE
========================================================= */

const storedSessionToken =
  sessionStorage.getItem("sessionToken");

const storedUser =
  sessionStorage.getItem("authUser");


const initialState = {
  user: storedUser
    ? JSON.parse(storedUser)
    : null,

  /*
   * Backend calls this RefreshToken,
   * but according to the backend contract this
   * value is the Session Token.
   */
  accessToken:
    storedSessionToken || null,

  modules: [],

  isAuthenticated:
    Boolean(storedSessionToken),
};


/* =========================================================
   AUTH SLICE
========================================================= */

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    /* =====================================================
       LOGIN / SET CREDENTIALS
    ===================================================== */

    setCredentials: (state, action) => {

      const {
        user,
        accessToken,
        modules = [],
      } = action.payload;


      state.user = user || null;

      state.accessToken =
        accessToken || null;

      state.modules =
        modules || [];

      state.isAuthenticated =
        Boolean(accessToken);


      /* -----------------------------------------------
         Persist session for current browser tab
      ------------------------------------------------ */

      if (accessToken) {

        sessionStorage.setItem(
          "sessionToken",
          accessToken
        );

      } else {

        sessionStorage.removeItem(
          "sessionToken"
        );
      }


      if (user) {

        sessionStorage.setItem(
          "authUser",
          JSON.stringify(user)
        );

      } else {

        sessionStorage.removeItem(
          "authUser"
        );
      }
    },


    /* =====================================================
       LOGOUT
    ===================================================== */

    logout: (state) => {

      state.user = null;

      state.accessToken = null;

      state.modules = [];

      state.isAuthenticated = false;


      sessionStorage.removeItem(
        "sessionToken"
      );

      sessionStorage.removeItem(
        "authUser"
      );
    },


    /* =====================================================
       UPDATE USER
       Optional helper for profile updates
    ===================================================== */

    updateUser: (state, action) => {

      state.user = {
        ...state.user,
        ...action.payload,
      };


      sessionStorage.setItem(
        "authUser",
        JSON.stringify(state.user)
      );
    },
  },
});


/* =========================================================
   EXPORT ACTIONS
========================================================= */

export const {
  setCredentials,
  logout,
  updateUser,
} = authSlice.actions;


/* =========================================================
   EXPORT REDUCER
========================================================= */

export default authSlice.reducer;