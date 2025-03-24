import cron from "node-cron";
import fetch from "node-fetch";

// Get the API URL from environment variables
const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL environment variable is not defined");
}

// Function to call the POST endpoint
const callAPI = async () => {
  try {
    await fetch(API_URL, { method: "POST" });
    console.log("api called:");
  } catch (error) {
    console.error("Error calling post:", (error as Error).message);
  }
};

// Schedule the cron job to run every minute
cron.schedule("* * * * *", () => {
  console.log("Running cron job to update list...");
  callAPI();
});

console.log("Cron job scheduled to run every minute.");
