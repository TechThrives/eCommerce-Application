import axios from "axios";

const axiosConfig = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("auth_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post(
            `/api/auth/refresh-token`,
            {
              refreshToken: refreshToken,
            }
          );
          if (response.data) {
          localStorage.setItem("auth_token", response.data.jwtToken);
          localStorage.setItem("refresh_token", response.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.jwtToken}`;
          return axios(originalRequest);
        }
        } catch (error) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("refresh_token");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
