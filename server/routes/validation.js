// Check if the value is null or undefined
const isNull = (value) => {
  return value === null || value === undefined;
};

export function validateId(user_id) {
  return /^[0-9]{8}$/.test(user_id);
}

export function validateName(name) {
  return !isNull(name) && /[a-zA-Z]{2,70}/.test(name);
}

export function validatePassword(pw) {
  return (
    !isNull(pw) &&
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw) &&
    pw.length >= 10
  );
}

//Validates the Course Number; it has to be a number with 3 to 4 digits maximum
export function validateNumber(number) {
  return !isNull(number) && /^[0-9]{3,4}$/.test(String(number));
}

//Validates the Department of the course; it has to be a string with min 2 characters and max 20
export function validateDepartment(dept) {
  return !isNull(dept) && /[a-zA-Z]{2,20}/.test(dept);
}

//Validates the Course ID; alphanumeric and it can contain underscores as well
export function validateCourseId(courseId) {
  return !isNull(courseId) && /^[a-zA-Z0-9_]{2,20}/.test(courseId);
}
