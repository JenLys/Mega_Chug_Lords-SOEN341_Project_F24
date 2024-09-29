// Check if the value is null or undefined
const isNull = (value) => {
  return value === null || value === undefined;
};

// Validate student ID (should be 8 digits and positive)
export const validateStudentId = (studentId) => {
  if (isNull(studentId)) {
    return { valid: false, message: "Student ID is required." };
  }
  if (!/^\d{8}$/.test(studentId) || parseInt(studentId) <= 0) {
    return {
      valid: false,
      message: "Student ID must be an 8-digit positive number.",
    };
  }
  return { valid: true };
};

// Validate first name and last name (should be strings and between 2 and 100 characters)
export const validateName = (name, fieldName) => {
  if (isNull(name)) {
    return { valid: false, message: `${fieldName} is required.` };
  }
  if (typeof name !== "string" || name.length < 2 || name.length > 100) {
    return {
      valid: false,
      message: `${fieldName} must be a string between 2 and 100 characters.`,
    };
  }
  return { valid: true };
};

// Validate password (at least 10 characters long and alphanumeric)
export const validatePassword = (password) => {
  if (isNull(password)) {
    return { valid: false, message: "Password is required." };
  }
  if (
    password.length < 10 ||
    !/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password)
  ) {
    return {
      valid: false,
      message: "Password must be at least 10 characters long and alphanumeric.",
    };
  }
  return { valid: true };
};

// Function to validate all user input
export const validateUserData = (data) => {
  const { studentId, firstName, lastName, password } = data;

  // Validate student ID
  const studentIdValidation = validateStudentId(studentId);
  if (!studentIdValidation.valid) {
    return studentIdValidation;
  }

  // Validate first name
  const firstNameValidation = validateName(firstName, "First name");
  if (!firstNameValidation.valid) {
    return firstNameValidation;
  }

  // Validate last name
  const lastNameValidation = validateName(lastName, "Last name");
  if (!lastNameValidation.valid) {
    return lastNameValidation;
  }

  // Validate password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    return passwordValidation;
  }

  // If all validations pass
  return { valid: true };
};
