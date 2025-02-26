# 🟢 Keep Alive Script

A Node.js script designed to send periodic POST requests to a FastAPI endpoint, ensuring continuous uptime.

## 🌐 Hosted on Google Cloud

### 🛠 Steps to Deploy on Google Cloud

1. **Go to Google Cloud Console**: [https://console.cloud.google.com](https://console.cloud.google.com)
2. **Navigate to Compute Engine → VM Instances**.
3. **Create a new VM instance**:
   - Click **Create Instance**.
   - Choose **E2-micro** (eligible for free tier).
   - Select **Ubuntu 22.04 LTS** as the OS.
   - Allow HTTP traffic.
   - Click **Create** and wait for the instance to start.
4. **Connect to the VM** via SSH by clicking the "SSH" button.
5. **Update and install dependencies**:
   ```sh
   sudo apt update && sudo apt upgrade -y
   sudo apt install git nodejs npm -y
   ```
6. **Clone the repository** (or pull latest changes if already cloned):
   ```sh
   git clone <repo_url> keep-alive
   cd keep-alive
   ```
7. **Add your environment variables**:
   ```sh
   nano .env
   ```
   Then, add the following environment variables and save the file:
   ```
   BACKEND_URL=<your_backend_url>
   FASTAPI_URL=<your_fastapi_url>
   USER_EMAIL=<your_email>
   USER_PASSWORD=<your_password>
   ```
8. **Install dependencies**:
   ```sh
   npm install
   ```
9. **Start the script using PM2**:
   ```sh
   pm2 start keepAlive.js --name keepAlive
   pm2 save
   ```
10. **To restart or update**:
    ```sh
    pm2 restart keepAlive || pm2 start keepAlive.js --name keepAlive
    ```

Your Keep Alive script is now running continuously on Google Cloud! 🚀

### ⚠️ Note on Render Free Tier

Render provides **750 hours of free-tier uptime per month**, which equals **31 days** of continuous usage. However, if you're running **multiple services** under the same account, the hours get split. To maximize uptime, consider using **separate Render accounts** for different services.
