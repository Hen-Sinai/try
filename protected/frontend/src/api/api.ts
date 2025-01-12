import axios from "axios";

// Define the base URL for the backend API
const apiClient = axios.create({
  baseURL: "http://172.16.8.166:8000",
  timeout: 5000,
});

// Fetch anomalies
export const fetchAnomalies = async () => {
  const response = await apiClient.get("/anomalies");
  return response.data;
};

// Fetch summary data
export const fetchSummary = async () => {
  const response = await apiClient.get("/summary");
  return response.data;
};
