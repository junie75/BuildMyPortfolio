import React, { useState } from "react";

//receives the skill object and the index of the skill as well as capitalization function
function SkillCard({
  skill,
  capitalizeFirstLetter,
  index,
  handleContainerClick,
}) {
  //array of colors to be used for the skill cards
  const colors = [
    "var(--verdigris)",
    "var(--tiffany)",
    "var(--celeste)",
    "var(--puce)",
    "var(--thistle)",
  ];

  // // state variables used to expand the skillcard into a modal
  // const [modalText, setModalText] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleClick = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  //shorten the description to less than 300 characters
  let truncatedDescription =
    skill.Description.length > 100
      ? skill.Description.substring(0, 200) + "..."
      : skill.Description;

  return (
    <div
      className="skillCard"
      style={{
        backgroundColor: colors[index % colors.length],
      }}
      onClick={() =>
        handleContainerClick(
          capitalizeFirstLetter(skill.Skill),
          skill.Description,
          colors[index % colors.length],
          skill.URL
        )
      }
    >
      <div className="cardTitle">{capitalizeFirstLetter(skill.Skill)}</div>
      <p className="cardText">{truncatedDescription}</p>
    </div>
  );
}

export default SkillCard;
