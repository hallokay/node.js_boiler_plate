import React, { useEffect } from "react";
import axios from "axios";

const LandinPage = () => {
  useEffect(() => {
    axios.get("/api/hello").then((res) => {
      console.log(res.data);
    });
  }, []);

  return <div>h1</div>;
};

export default LandinPage;
