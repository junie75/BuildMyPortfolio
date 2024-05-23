import React, { useContext } from "react";
import "ldrs/ring"; //for loading animation
import { useNavigate } from "react-router-dom";
import { SharedStateContext } from "./context/Context";

function Home() {
  //receive state variables from the context
  const { dreamJob, setDreamJob, isLoading, setIsLoading, setJobSearched } =
    useContext(SharedStateContext);

  //used to navigate to the different pages
  const navigate = useNavigate();

  //on submit, change the state to searched and navigate to portfolio which fetches the skills
  const handleSubmit = async (e) => {
    //prevent page from refreshing
    e.preventDefault();

    //ensures the search value is not empty
    if (dreamJob === "") {
      alert("Please enter a value.");
    } else {
      //modify state variables
      setIsLoading(true);
      setJobSearched(true);

      //navigate to the portfolio page
      navigate("/portfolio");
    }
  };

  //render page
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
                  //update dream job state variable every time text is changed
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
    </div>
  );
}

export default Home;
