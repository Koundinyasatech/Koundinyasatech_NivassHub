export const loggerMiddleware = (store) => (next) => (action) => {
  if (__DEV__) {
    console.log('[Redux]', action.type, action.payload ?? '');
  }
  return next(action);
};
