export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  export const validateForm = (formData) => {
    const errors = {};
    
    if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }
  
    if (!validatePassword(formData.password)) {
      errors.password = "Password must be at least 6 characters long";
    }
  
    return errors;
  };
  