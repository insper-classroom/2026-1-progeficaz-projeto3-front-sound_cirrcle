import api from "./axiosConfig";

export const getDailyFeed = (sort = "", period = "daily") =>
  api.get(`/api/feed/daily?period=${period}${sort ? `&sort=${sort}` : ""}`);

// RESTful: ratings como sub-recurso de tracks
export const rateTrack = (data) =>
  api.post(`/api/feed/tracks/${data.track_id}/ratings`, { score: data.score });

export const deleteRating = (trackId) =>
  api.delete(`/api/feed/tracks/${trackId}/ratings`);

// RESTful: comments como sub-recurso de tracks
export const getComments = (trackId) =>
  api.get(`/api/feed/tracks/${trackId}/comments`);

export const postComment = (data) =>
  api.post(`/api/feed/tracks/${data.track_id}/comments`, { text: data.text });

export const deleteComment = (trackId, commentId) =>
  api.delete(`/api/feed/tracks/${trackId}/comments/${commentId}`);

// RESTful: sentiment como sub-recurso de tracks
export const getSentiment = (trackId) =>
  api.get(`/api/feed/tracks/${trackId}/sentiment`);

export const promoteTrack = (data) =>
  api.post("/api/feed/promote", data);
