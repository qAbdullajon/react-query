export const saveAccessToken = (access_token: string) => {
  sessionStorage.setItem("access_token", access_token);
};
export const getAccessToken = () => {
  return sessionStorage.getItem("access_token");
};
export const removeAccessToken = () => {
  sessionStorage.removeItem("access_token");
};
