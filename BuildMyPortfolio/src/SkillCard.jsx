import React from "react";

//receives the skill object and the index of the skill as well as capitalization function
function SkillCard({ skill, capitalizeFirstLetter, index }) {
  //array of colors to be used for the skill cards
  const colors = [
    "var(--verdigris)",
    "var(--tiffany)",
    "var(--celeste)",
    "var(--puce)",
    "var(--thistle)",
  ];

  //shorten the description to less than 300 characters
  let truncatedDescription =
    skill.Description.length > 100
      ? skill.Description.substring(0, 300) + "..."
      : skill.Description;

  return (
    <div
      className="skillCard"
      style={{
        backgroundColor: colors[index % colors.length],
      }}
    >
      <p className="cardTitle">{capitalizeFirstLetter(skill.Skill)}</p>
      <p className="cardText">{truncatedDescription}</p>
    </div>
  );
}

export default SkillCard;
