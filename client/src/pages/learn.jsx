// import React from "react";

import { useState } from "react";
// import Layout from "../Component/Layout/Layout";

export default function Learn() {
  const [count, setCount] = useState(2);

  return (
    <>
      <button
        className="btn"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </button>
    </>
  );
}
