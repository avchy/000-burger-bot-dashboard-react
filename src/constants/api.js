const developmentURL = "http://localhost:5005";
const productionURL = "https://burgerim.ru";

export const baseURL =
  process.env.NODE_ENV === "development" ? developmentURL : productionURL;

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("baseURL", baseURL);
