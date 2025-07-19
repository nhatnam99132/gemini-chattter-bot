# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Run with Docker

**Prerequisites:** Docker

1. Build the Docker image:
   ```bash
   docker build -t chatterbots .
   ```

2. Run the container with your GEMINI_API_KEY:
   ```bash
   docker run -d -p 5000:5000 -e GEMINI_API_KEY=your_api_key_here chatterbots
   ```

3. Access the application at `http://localhost:5000`

### Docker Commands

- **Build:** `docker build -t chatterbots .`
- **Run:** `docker run -d -p 5000:5000 -e GEMINI_API_KEY=your_key chatterbots`
- **Run with env file:** `docker run -d -p 5000:5000 --env-file .env.local chatterbots`
- **Stop container:** `docker stop <container_id>`
- **View running containers:** `docker ps`
