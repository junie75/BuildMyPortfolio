import React from "react";

function SkillCard({ skill, capitalizeFirstLetter, index }) {
  const colors = [
    "var(--verdigris)",
    "var(--tiffany)",
    "var(--celeste)",
    "var(--puce)",
    "var(--thistle)",
  ];

  let truncatedDescription =
    skill.Description.length > 100
      ? skill.Description.substring(0, 300) + "..."
      : skill.Description;

  return (
    <div
      className="skillCard"
      style={{
        backgroundColor: colors[index % colors.length],
        // background: `linear-gradient(135deg, ${
        //   colors[index % colors.length]
        // }, white 99%)`,
      }}
    >
      <p className="cardTitle">{capitalizeFirstLetter(skill.Skill)}</p>
      <p className="cardText">
        {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum iure
        corrupti molestias iste impedit tempora a laudantium. Modi, assumenda
        sapiente, recusandae rerum ut voluptatibus totam vel quasi error
        exercitationem dolore? */}
        {truncatedDescription}
      </p>
    </div>
  );
}

export default SkillCard;
