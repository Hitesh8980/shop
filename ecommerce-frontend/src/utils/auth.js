export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem("user");
  };
  
  export const saveUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };
  
  export const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    window.location.reload();
  };
  