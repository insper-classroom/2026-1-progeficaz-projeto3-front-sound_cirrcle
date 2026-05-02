import api from "./axiosConfig";

export const register = (data) => api.post("/api/auth/register", data);
export const login = (data) => api.post("/api/auth/login", data);
export const logout = () => api.post("/api/auth/logout");
export const me = () => api.get("/api/auth/me");
