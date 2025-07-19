# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
3. Enter your Gemini API key in the input screen when prompted

## Run with Docker

**Prerequisites:** Docker

1. Build the Docker image:
   ```bash
   docker build -t chatterbots .
   ```

2. Run the container:
   ```bash
   docker run -d -p 5000:5000 chatterbots
   ```

3. Access the application at `http://localhost:5000` and enter your API key when prompted

### Docker Commands

- **Build:** `docker build -t chatterbots .`
- **Run:** `docker run -d -p 5000:5000 chatterbots`
- **Stop container:** `docker stop <container_id>`
- **View running containers:** `docker ps`
