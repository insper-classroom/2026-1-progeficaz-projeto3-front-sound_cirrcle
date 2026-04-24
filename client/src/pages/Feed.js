// Lógica do feed

import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedView from "../components/FeedView";

function Feed() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/feed")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return <FeedView data={data} />;
}

export default Feed;