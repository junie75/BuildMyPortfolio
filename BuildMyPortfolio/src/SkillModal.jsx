import React from "react";

function SkillModal({ title, text, onClose, modalColor, url }) {
  const handleReadMore = () => {
    window.open(url, "_blank"); // Open Wikipedia page in a new tab
  };

  //shorten the description to less than 300 characters
  let truncatedText =
    text.length > 1200 ? text.substring(0, 1150) + "..." : text;
  return (
    <div className="skillModal">
      <div className="modalContent" style={{ backgroundColor: modalColor }}>
        <div className="modalHeader">
          <span className="modalClose" onClick={onClose}>
            &times;
          </span>
          <div className="modalTitle">{title}</div>
        </div>
        <p style={{ display: "flex", flexDirection: "column" }}>
          {truncatedText}
          <span className="readMore" onClick={handleReadMore}>
            Read More
          </span>
        </p>
      </div>
    </div>
  );
}

export default SkillModal;
