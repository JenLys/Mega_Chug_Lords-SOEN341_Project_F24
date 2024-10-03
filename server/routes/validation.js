// Check if the value is null or undefined
const isNull = (value) => {
  return value === null || value === undefined;
};

export async function validateId(user_id) {
  return /^[0-9]{8}$/.test(user_id)
}

export function validateName(name) {
  return !isNull(name) && /[a-zA-Z]{2,70}/.test(name)
}

export function validatePassword(pw) {
  return !isNull(pw) && /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw) &&
    pw.length >= 10;
}
