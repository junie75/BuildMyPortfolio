import React, { useState, useEffect, createContext } from "react";

// Step 1: Create a context
export const SharedStateContext = createContext();

// Step 2: Create a provider component
const SharedStateProvider = ({ children }) => {
  // const [isLocalStorageCleared, setIsLocalStorageCleared] = useState(false);

  // const [jobSearched, setJobSearched] = useState(
  //   () => localStorage.getItem("jobSearched") || ""
  // );
  // const [isLoading, setIsLoading] = useState(
  //   () => JSON.parse(localStorage.getItem("isLoading")) === "true"
  // );
  // const [data, setData] = useState(
  //   () => JSON.parse(localStorage.getItem("data")) || []
  // );
  // const [dreamJob, setDreamJob] = useState(
  //   () => localStorage.getItem("dreamJob") || ""
  // );

  const [data, setData] = useState([]);
  const [dreamJob, setDreamJob] = useState("");

  // const [dreamJob, setDreamJob] = useState(() => {
  //   // Get the initial state from localStorage if it exists
  //   const savedDreamJob = localStorage.getItem("dreamJob");
  //   return savedDreamJob ? JSON.parse(savedDreamJob) : "";
  // });

  // const [data, setData] = useState(() => {
  //   // Get the initial state from localStorage if it exists
  //   const setData = localStorage.getItem("data");
  //   return setData ? JSON.parse(setData) : "";
  // });

  const [isLoading, setIsLoading] = useState(false);
  const [jobSearched, setJobSearched] = useState(false);

  // useEffect(() => {
  //   // Save the state to localStorage whenever it changes
  //   localStorage.setItem("dreamJob", JSON.stringify(dreamJob));
  // }, [dreamJob]);

  // useEffect(() => {
  //   // Save the state to localStorage whenever it changes
  //   localStorage.setItem("data", JSON.stringify(data));
  // }, [data]);

  // useEffect(() => {
  //   if (!isLocalStorageCleared) {
  //     localStorage.setItem("jobSearched", jobSearched);
  //     localStorage.setItem("isLoading", String(isLoading));
  //     localStorage.setItem("data", JSON.stringify(data));
  //     localStorage.setItem("dreamJob", dreamJob);
  //   }
  // }, [jobSearched, data, dreamJob, isLoading]);

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
