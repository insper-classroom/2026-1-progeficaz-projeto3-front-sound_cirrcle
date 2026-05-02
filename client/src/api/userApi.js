import api from "./axiosConfig";

export const getProfile = () => api.get("/api/user/profile");

// RESTful: PATCH para atualização parcial do perfil
export const updateDisplayName = (displayName) =>
  api.patch("/api/user/profile", { display_name: displayName });

export const getRatedTracks = () => api.get("/api/user/rated-tracks");
