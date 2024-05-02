import React, { useState, useEffect } from "react";
import "ldrs/ring";
import axios from "axios";
import { hourglass } from "ldrs";

function App() {
  const [data, setData] = useState([]);
  const [dreamJob, setDreamJob] = useState("");
  const [jobSearched, setJobSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  hourglass.register();

  // useEffect(() => {
  //   fetchSkills();
  // }, []);

  // const fetchAPI = async () => {
  //   const response = await axios.get("http://localhost:8080/api/users");
  //   console.log(response.data.users);
  //   setData(response.data.users);
  // };

  const fetchSkills = async () => {
    // const response = await fetch("http://localhost:8080/api/test");
    // const responseData = await response.json();
    // setData(responseData.Skill);
    // console.log(responseData.Skill);

    const data = dreamJob;
    const url = "http://localhost:8080/api/skills";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    // console.log(options);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dreamJob === "") {
      alert("Please enter a value.");
    } else {
      setIsLoading(true);
      setJobSearched(true);
      fetchSkills();
    }

    // console.log(dreamJob);
    // console.log("submittee");

    // const data = dreamJob;
    // const url = "http://localhost:8080/api/skills";
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // };
    // // console.log(options);

    // const response = await fetch(url, options);
    // if (response.status != 201 && response.status != 200) {
    //   const info = await response.json();
    //   alert(info.message);
    // } else {
    //   const responseData = await response.json();
    //   setData(responseData);
    //   console.log(responseData);
    // }
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // let skills = null;
  // if (Object.keys(data).length !== 0) {
  //   // Map over the keys in the "Skill" dictionary
  //   skills = Object.keys(data["Skill"]).map((skill_id) => {
  //     const skill_name = data["Skill"][skill_id]; // Get the skill name
  //     const count = data["Count"][skill_id]; // Get the count for the skill
  //     return (
  //       <div key={skill_id}>
  //         <p>
  //           {skill_name}: {count}
  //         </p>
  //       </div>
  //     );
  //   });
  // }

  return (
    <div className="container">
      {!isLoading && (
        <div className="topContainer">
          <p className="prompt">Enter your dream job: </p>
          <form onSubmit={handleSubmit}>
            <div className="searchDiv">
              <div className="jobInput">
                <input
                  className="inputBox"
                  type="text"
                  // placeholder="Type your dream job here..."
                  value={dreamJob}
                  onChange={(event) => setDreamJob(event.target.value)}
                />
              </div>
              <button className="submitBtn" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      )}
      {isLoading && (
        <div className="loadingBox">
          <p className="loadingTxt">Finding your needed skills...</p>
          <l-hourglass
            size="40"
            bg-opacity="0.1"
            speed="1.75"
            color="white"
          ></l-hourglass>
        </div>
      )}
      {jobSearched && !isLoading && (
        <div className="resultsBox">
          <p className="portfolioTxt">Your strongest portfolio:</p>
          <div className="results">
            {data.slice(0, 5).map((skill, index) => (
              <li key={index} className="skill">
                {capitalizeFirstLetter(skill.Skill)}:{" "}
                {skill.Percentage.toFixed(2)}%
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
