import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SharedStateContext } from "./context/Context.jsx";
import Loading from "./Loading.jsx";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import SkillCard from "./SkillCard.jsx";

//color themes array for skills in the charts
//first 5 colors match with the colors in skillcards.jsx
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
  //receive state variables from context
  const { jobSearched, isLoading, setIsLoading, data, dreamJob, setData } =
    useContext(SharedStateContext);

  //used to naviate back to home page
  const navigate = useNavigate();

  useEffect(() => {
    //upon navigation to the page, call skills API
    fetchSkills();
  }, []);

  //asynchronous call to backend server with job name to retrieve job skills data
  const fetchSkills = async () => {
    //set job name as json data
    const data = dreamJob;

    //app route of the api on server
    const url = "http://localhost:8080/api/skills";

    //set post method and let server know json data is included in request, jsonify dream job name
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    //send request and fetch response
    const response = await fetch(url, options);

    //ensure that the response has OK status, if not send an alert to the user with the error message
    if (response.status != 201 && response.status != 200) {
      const info = await response.json();
      alert(info.message);
    } else {
      //convert json to object
      const responseData = await response.json();

      //set state variable with data
      setData(responseData);
      console.log(responseData);
    }

    //turn off loading indicator
    setIsLoading(false);
  };

  //capitalizes the first letter in every word of a string
  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Calculate the total count for calculation of frequency of skills
  const totalCount = data.reduce((total, skill) => total + skill.Count, 0);

  return (
    <>
      {
        //if isLoading is true, render loading page
        isLoading && <Loading text="Finding your needed skills" />
      }
      {
        //once fetching is complete, render portfolio page with data
        jobSearched && !isLoading && (
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
                //go back to home page
                onClick={() => navigate("/")}
              >
                Search Again
              </p>
              <div className="header">
                Your {capitalizeFirstLetter(dreamJob)} Portfolio
              </div>
            </div>

            <div className="carouselContainer">
              {
                //map over the first 5 skills and display them in a carousel with descriptions
                data
                  .filter((skill) => skill.Description !== null)
                  .slice(0, 5)
                  .map((skill, index) => (
                    <SkillCard
                      key={index}
                      skill={skill}
                      index={index}
                      capitalizeFirstLetter={capitalizeFirstLetter}
                    />
                  ))
              }
            </div>

            <div className="chartsContainer">
              <div className="chart1">
                <Bar
                  //bar chart displays the percentage of employers that desire the skill
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
                  //bar chart only displays first 5 skills
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

                        borderColor: data
                          .slice(0, 5)
                          .map((_, index) => colors[index % colors.length]),
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
              <div className="chart2">
                <Doughnut
                  //doughnut chart displays the frequency of skills mentioned
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
                    //doughnut chart displays first 10 skills
                  }}
                  data={{
                    labels: data.slice(0, 10).map((skill) => skill.Skill),
                    datasets: [
                      {
                        label: "Skill Frequency",
                        data: data
                          .slice(0, 10)
                          .map((skill) =>
                            (skill.Count / totalCount).toFixed(2)
                          ),
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
        )
      }
    </>
  );
}

export default Portfolio;
