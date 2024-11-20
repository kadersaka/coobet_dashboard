import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.BASE_URL;

console.log("BASE_URL from .env:", process.env.BASE_URL);

console.log("base Url from .env:", process.env.BASE_URL);

const AppConstants = {
  baseUrl: `${baseUrl}l`,
};

export default AppConstants;
