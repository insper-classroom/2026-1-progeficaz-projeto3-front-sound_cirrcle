// "HTML" do feed

import React from "react";

function FeedView({ data }) {
  return (
    <div>
      <h1>Feed</h1>

      {data ? (
        <p>{data.message}</p>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default FeedView;