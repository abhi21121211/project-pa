# Project PA - Cloud Backend

This is the backend service for Project PA, responsible for hosting and serving presentation scripts.

## API Endpoints

### 1. Save Presentation
- **URL**: `/api/presentations`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "projectId": "my-project-id",
    "data": { ...presentation.json content... }
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "id": "mongo_id",
    "projectId": "my-project-id"
  }
  ```

### 2. Get Presentation
- **URL**: `/api/presentations/:projectId`
- **Method**: `GET`
- **Response**: Returns the `presentation.json` content.

## Deployment (Render)

This project is configured for deployment on [Render](https://render.com).

1.  Connect your GitHub repository to Render.
2.  Select **Blueprints** and use the `render.yaml` file in the root.
3.  **Important**: You must manually add the `MONGODB_URI` environment variable in the Render dashboard after the service is created.

## Local Development

1.  Create a `.env` file in `packages/backend`:
    ```
    MONGODB_URI=your_mongodb_connection_string
    PORT=5001
    ```
2.  Run `npm start` inside `packages/backend`.
