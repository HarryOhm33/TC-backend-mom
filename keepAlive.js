const axios = require("axios");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const backendUrl = process.env.BACKEND_URL;
const fastApiUrl = process.env.FASTAPI_URL;
const userEmail = process.env.USER_EMAIL;
const userPassword = process.env.USER_PASSWORD;

// Login Function
const login = async () => {
  try {
    const response = await axios.post(`${backendUrl}/api/auth/login`, {
      email: userEmail,
      password: userPassword,
    });
    console.log("✅ Logged in");
    return response.data.token;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
  }
};

// Send Request to FastAPI
// Send Request to FastAPI
const sendRequest = async (token) => {
  try {
    const currentTimeIST = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    });

    console.log(`🚀 Sending Request To AI at ${currentTimeIST}...`);
    const response = await axios.post(
      fastApiUrl,
      {
        title: "KeepAlive Title",
        message: "This is a keep-alive message",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("✅ Request successful:", response.data);
  } catch (error) {
    console.error("❌ Request failed:", error.response?.data || error.message);
  }
};

// KeepAlive with Interval
const keepAlive = async () => {
  console.log("🔄 Starting Cycle....");
  const token = await login();
  if (!token) return;

  await sendRequest(token);
  console.log("✅ Cycle Complete...");
};

// Run every 3 minutes
keepAlive();
setInterval(keepAlive, 3 * 60 * 1000); // 2 minutes

// Health Check Route for UptimeRobot
app.get("/", (req, res) => {
  res.send("🚀 Keep-Alive Script is Running");
  console.log("External Ping Detected!!");
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Health check running on port ${PORT}`)
);
