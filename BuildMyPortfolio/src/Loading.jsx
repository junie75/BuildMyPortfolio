import React from "react";
import { hourglass } from "ldrs"; //hourglass loading animation icon

//receive loading texts
function Loading({ text }) {
  //initialize the hourglass loading icon
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
