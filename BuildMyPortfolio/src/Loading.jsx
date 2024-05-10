import React from "react";
import { hourglass } from "ldrs";

function Loading({ text }) {
  hourglass.register();
  return (
    <div className="loadingBox">
      <p className="loadingTxt">{text}</p>
      <l-hourglass
        size="40"
        bg-opacity="0.1"
        speed="1.75"
        color="white"
      ></l-hourglass>
    </div>
  );
}

export default Loading;
