# job_management_backend
# Backend Application

This is the backend application for the job management system. It serves as the server-side component responsible for handling data storage, retrieval, and manipulation operations.

## Features

- **Job Data Management:** Storing and managing job data in a JSON file stored on the backend.
- **RESTful API:** Exposing RESTful API endpoints to perform CRUD operations on job data.
- **Request Handling:** Handling HTTP requests from the frontend application and processing them accordingly.
- **Error Handling:** Handling errors gracefully and providing appropriate error responses.

## Architecture
The backend is built using Node.js with the Express.js framework. It follows a RESTful architecture for managing job data. The architecture is modular, separating concerns like routes,utility files from the entry point file.

## Technologies Used

- Node.js: JavaScript runtime for building server-side applications.
- Express.js: Web application framework for Node.js for handling HTTP requests.
- fs: A Node.js module for interacting with the file system, allowing oopeartions such as reading and writing. As a JSON file was used to as the databse, fs module was used to interact with the file.
- cors: Middleware for enabling Cross-Origin Resource Sharing.

## API Documentation
- GET /jobs: Retrieve a list of all jobs.
- GET /jobs/:id: Retrieve a specific job by its ID.
- POST /jobs: Create a new job.
- PUT /jobs/:id: Update an existing job by its ID.
- DELETE /jobs/:id: Delete an existing job by its ID.

## Getting Started

Follow the instructions below to set up and run the backend application locally:

1. Clone this repository.
2. Navigate to the `job_management_backend` directory using the command: `cd job_management_backend`
3. Install dependencies: `npm install`.
4. Start the backend server: `node server.js`.
