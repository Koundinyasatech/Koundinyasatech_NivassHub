export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}

export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0;
}

export function minLength(value, min) {
  return String(value).length >= min;
}
