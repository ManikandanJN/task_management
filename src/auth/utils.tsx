export const isAuthenticated = () => {
  // Replace this with your actual authentication logic (e.g., token validation).
  return localStorage.getItem("authToken") !== null;
};
