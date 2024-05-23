import React, { useState, createContext } from "react";

// Step 1: Create a context
export const SharedStateContext = createContext();

// Step 2: Create a provider component
const SharedStateProvider = ({ children }) => {
  //initialize state variables
  const [data, setData] = useState([]);
  const [dreamJob, setDreamJob] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jobSearched, setJobSearched] = useState(false);

  return (
    <SharedStateContext.Provider
      value={{
        data,
        setData,
        dreamJob,
        setDreamJob,
        isLoading,
        setIsLoading,
        jobSearched,
        setJobSearched,
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
};

export default SharedStateProvider;
