const useLogin = () => {
  const login = (username, password) => {
    console.log({ username, password });
    // Here you can implement your login logic using Axios or any other method
    // For simplicity, logging the username and password to console
  };

  return { login };
};

export default useLogin;
