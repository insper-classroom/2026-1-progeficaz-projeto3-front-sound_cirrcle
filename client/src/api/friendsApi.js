import api from "./axiosConfig";

export const getFriends = () => api.get("/api/friends");

export const getPendingRequests = () => api.get("/api/friends/pending");

// RESTful: POST /api/friends (o recurso é a própria amizade)
export const sendFriendRequest = (displayName) =>
  api.post("/api/friends", { display_name: displayName });

// RESTful: PATCH /api/friends/requests/<request_id>
export const respondRequest = (requestId, action) =>
  api.patch(`/api/friends/requests/${requestId}`, { action });

// RESTful: DELETE /api/friends/<friend_id>
export const removeFriend = (friendId) =>
  api.delete(`/api/friends/${friendId}`);

export const getFriendRatings = (friendId) =>
  api.get(`/api/friends/${friendId}/ratings`);
