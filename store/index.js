import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import residentReducer from './slices/residentSlice';
import visitorReducer from './slices/visitorSlice';
import maintenanceReducer from './slices/maintenanceSlice';
import noticeReducer from './slices/noticeSlice';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    residents: residentReducer,
    visitors: visitorReducer,
    maintenance: maintenanceReducer,
    notices: noticeReducer,
  },
});

export default store;
