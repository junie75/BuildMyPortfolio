import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [dreamJob, setDreamJob] = useState("");

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/users");
    console.log(response.data.users);
    setData(response.data.users);
  };

  const handleSubmit = () => {
    console.log(dreamJob);
    console.log("submittee");
  };

  return (
    <div className="container">
      <p className="prompt">Enter your dream job: </p>
      <form onSubmit={() => handleSubmit()}>
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
          {/* <button className="submitBtn" type="submit">
            Search
          </button> */}
        </div>
      </form>
      {/* <p>
        {data.map((user, index) => (
          <span key={index}>{user}</span>
        ))}
      </p> */}
    </div>
  );
}

export default App;
