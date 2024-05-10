import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SharedStateContext } from "./context/Context.jsx";
import Loading from "./Loading.jsx";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { PolarArea } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
// } from "chart.js";

// ChartJS.register(LineElement, PointElement, LinearScale, Title);

import SkillCard from "./SkillCard.jsx";

const colors = [
  "#64b6ac",
  "#92dad4",
  "#c0fdfb",
  "#bb7e8c",
  "#c9b6be",
  "#f2e2e2",
  "#f4acb7",
  "#f4978e",
  "#f2a07b",
  "#f2b880",
];

function Portfolio() {
  const { jobSearched, isLoading, setIsLoading, data, dreamJob, setData } =
    useContext(SharedStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    // if (
    //   window.performance.getEntriesByType("navigation")[0].type === "reload"
    // ) {
    //   navigate("/");
    // }
    // if (!data.length) {
    fetchSkills();
    // }

    // return () => {
    //   navigate("/");
    // };
  }, []);

  // const [index, setIndex] = useState(0);

  // const handleSelect = (selectedIndex) => {
  //   setIndex(selectedIndex);
  // };

  const fetchSkills = async () => {
    const data = dreamJob;
    const url = "http://localhost:8080/api/skills";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    if (response.status != 201 && response.status != 200) {
      const info = await response.json();
      alert(info.message);
    } else {
      const responseData = await response.json();
      setData(responseData);
      console.log(responseData);
    }

    setIsLoading(false);
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Calculate the total count
  const totalCount = data.reduce((total, skill) => total + skill.Count, 0);

  return (
    <>
      {isLoading && <Loading text="Finding your needed skills" />}
      {jobSearched && !isLoading && (
        <div className="grid-container">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                position: "absolute",
                left: "5%",
                color: "white",
                textDecorationLine: "underline",
              }}
              onClick={() => navigate("/")}
            >
              Search Again
            </p>
            <div className="header">
              Your {capitalizeFirstLetter(dreamJob)} Portfolio
            </div>
          </div>

          <div className="carouselContainer">
            {data
              .filter((skill) => skill.Description !== null)
              .slice(0, 5)
              .map((skill, index) => (
                <SkillCard
                  key={index}
                  skill={skill}
                  index={index}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                />
              ))}
          </div>

          <div className="chartsContainer">
            <div className="chart1">
              <Bar
                className="barChart"
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Percentage of Employers That Desire This Skill",
                      color: "#FFFFFF", // Change the font color of the title
                    },
                    legend: {
                      labels: {
                        color: "#FFFFFF", // Change the font color of the legend
                      },
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: "#FFFFFF", // Change the font color of the x-axis labels
                      },
                    },
                    y: {
                      ticks: {
                        color: "#FFFFFF", // Change the font color of the y-axis labels
                      },
                    },
                  },
                }}
                data={{
                  labels: data
                    .slice(0, 5)
                    .map((skill) => capitalizeFirstLetter(skill.Skill)),
                  datasets: [
                    {
                      label: "Percentage Of Employers",
                      data: data
                        .slice(0, 5)
                        .map((skill) => skill.Percentage.toFixed(2)),
                      backgroundColor: data
                        .slice(0, 5)
                        .map((_, index) => colors[index % colors.length]),
                      // [
                      //   "rgba(255, 99, 132, 1)",
                      //   "rgba(54, 162, 235, 1)",
                      //   "rgba(255, 206, 86, 1)",
                      //   "rgba(75, 192, 192, 1)",
                      //   "rgba(153, 102, 255, 1)",
                      // ],
                      borderColor: data
                        .slice(0, 5)
                        .map((_, index) => colors[index % colors.length]),
                      // [
                      //   "rgba(255, 99, 132, 1)",
                      //   "rgba(54, 162, 235, 1)",
                      //   "rgba(255, 206, 86, 1)",
                      //   "rgba(75, 192, 192, 1)",
                      //   "rgba(153, 102, 255, 1)",
                      // ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
            <div className="chart2">
              <Doughnut
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Common Skills by Frequency Mentioned",
                      color: "#FFFFFF", // Change the font color of the title
                    },
                    legend: {
                      labels: {
                        color: "#FFFFFF", // Change the font color of the legend
                      },
                    },
                  },
                  // scales: {
                  //   x: {
                  //     ticks: {
                  //       color: "#FFFFFF", // Change the font color of the x-axis labels
                  //     },
                  //   },
                  //   y: {
                  //     ticks: {
                  //       color: "#FFFFFF", // Change the font color of the y-axis labels
                  //     },
                  //   },
                  // },
                }}
                data={{
                  labels: data.slice(0, 10).map((skill) => skill.Skill),
                  datasets: [
                    {
                      label: "Skill Frequency",
                      data: data
                        .slice(0, 10)
                        .map((skill) => (skill.Count / totalCount).toFixed(2)),
                      backgroundColor: data.map(
                        (_, index) => colors[index % colors.length]
                      ),
                      borderColor: data.map(
                        (_, index) => colors[index % colors.length]
                      ),
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Portfolio;
