# COMP3123 Assignment 1 - Employee Management API

**Ghazaleh AzimiKorf**  
**Student ID:** 101564963  
**Course:** COMP3123 - Full Stack Development I  
**Assignment:** Assignment 1

## About My Project

For this assignment, I created an Employee Management REST API using Node.js, Express.js, and MongoDB.

The main purpose of my project is to allow users to sign up, log in, and manage their employees.

Each user can only see, add, update, and delete their own employees. I used JWT authentication to protect the employee routes.

I also added validation, password hashing, security features, error handling, and logging.

## Technologies I Used

- **Node.js:** To run my backend application.
- **Express.js:** To create the API routes.
- **MongoDB Atlas:** To store users and employees.
- **Mongoose:** To connect Node.js with MongoDB.
- **bcryptjs:** To hash user passwords.
- **JWT:** For user authentication.
- **express-validator:** To validate user input.
- **Helmet:** To add security headers.
- **express-rate-limit:** To limit repeated login and signup requests.
- **Winston:** To save application logs.
- **Postman:** To test my API endpoints.
- **GitHub:** To save my project and commits.

## Project Structure

I organized my project into different folders to keep my code easier to understand.

- **routes:** Contains the API routes.
- **controllers:** Handles the requests and responses.
- **models:** Contains the MongoDB models for users and employees.
- **middleware:** Contains authentication, validation, rate limiting, and error handling.
- **config:** Contains the database connection.
- **utils:** Contains helper files such as the logger.

## Project Setup

To run my project, first clone the repository:

```bash
git clone https://github.com/Ghazalehaz/101564963_COMP3123_Assignment1.git
```

Open the project folder:

```bash
cd 101564963_COMP3123_Assignment1
```

Install the packages:

```bash
npm install
```

Create a `.env` file in the main folder and add the required information:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

I included a `.env.example` file to show which environment variables are needed.

I used MongoDB Atlas, so I need a working MongoDB Atlas connection to run my project. I do not need to start a local MongoDB server.

The MongoDB connection should use the database named `comp3123_assignment1`.

The real MongoDB password and JWT secret should not be shared or uploaded to GitHub.

To start the server:

```bash
npm start
```

For development, I can also use:

```bash
npm run dev
```

The server runs on `http://localhost:3000` by default.

## API Endpoints

### User APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/user/signup` | Register a new user |
| POST | `/api/v1/user/login` | Log in with username or email |

During signup, the API checks if the username or email already exists. It also validates the input and hashes the password before saving it.

During login, the API checks the user's password and returns a JWT token if the information is correct.

### Employee APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/emp/employees` | Get all my employees |
| POST | `/api/v1/emp/employees` | Create a new employee |
| GET | `/api/v1/emp/employees/:eid` | Get an employee by ID |
| PUT | `/api/v1/emp/employees/:eid` | Update an employee |
| DELETE | `/api/v1/emp/employees?eid=xxx` | Delete an employee |

All employee routes require a valid JWT token.

When creating an employee, I used these fields:

- First name
- Last name
- Email
- Position
- Salary
- Date of joining
- Department

The server automatically saves the user ID as the owner of the employee.

## MongoDB Database

I used MongoDB Atlas for my database.

The database name is:

`comp3123_assignment1`

I created two collections:

- **users:** Stores username, email, hashed password, and timestamps.
- **employees:** Stores employee information and the ID of the user who created the employee.

I used a `user` field in the Employee model to connect employees to their owners.

## Authentication and Security

For security, I used JWT authentication.

When a user logs in successfully, the server generates a token that is valid for one hour.

The token is sent in the request header:

```text
Authorization: Bearer <token>
```

I created authentication middleware to check the token before allowing access to employee routes.

I also made sure that users cannot access employees belonging to another user.

For example, I created two test users:

- `testuser1`
- `testuser2`

I tested whether User 1 could access, update, or delete User 2's employee. The API returned `404 Not Found`, which showed that access was blocked.

I also tested the same thing with User 2 trying to access User 1's employee.

I used bcryptjs to hash passwords, Helmet for HTTP security headers, and rate limiting for signup and login.

Rate limiting helps prevent users from sending too many requests in a short time.

The rate limiter allows 5 requests within 15 minutes. After that, it returns `429 Too Many Requests`.

## Input Validation

I used express-validator to check user and employee information before saving it.

For signup, I checked username, email, and password requirements.

For employees, I checked required fields, valid email addresses, positive salary values, valid dates, and employee IDs.

If the information is incorrect, the API returns `400 Bad Request` with a validation message.

I also updated the signup validation response so that the password value is not included in error messages.

## Error Handling and Logging

I created centralized error-handling middleware to handle errors and return JSON responses.

Some status codes I used are:

| Status | Meaning |
|---|---|
| 200 | Request successful |
| 201 | New record created |
| 204 | Record deleted |
| 400 | Invalid information |
| 401 | Unauthorized request |
| 404 | Record or route not found |
| 409 | Duplicate information |
| 429 | Too many requests |
| 500 | Internal server error |

I used Winston for local logging.

The logs are saved in:

`logs/application.log`

The log file records information such as the request method, path, status code, response time, and timestamp.

I did not include user passwords or JWT tokens in the logs.

## Health Check

I added a health-check endpoint to see if my server is running.

**Method:** GET

**Endpoint:** `/health`

Example response:

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Testing With Postman

I used Postman to test my API endpoints.

Some of the tests I completed include:

- Successful user signup and login
- Login using username and email
- Duplicate username and email
- Invalid signup email and weak password
- Missing required fields
- Creating, viewing, updating, and deleting employees
- Invalid employee email, salary, date, and ID
- Missing, expired, and invalid JWT tokens
- Testing employee access with two different users
- Unauthorized employee update and delete
- Rate limiting with 429 response
- Invalid JSON and unknown API routes
- Health-check endpoint
- Helmet security headers

I also checked my MongoDB collections to make sure the information was saved correctly and user passwords were hashed.

I exported my Postman collection and took screenshots to show the results.

### How to Test My API

To test my project, first start the server.

Open Postman and import the Postman collection included with my assignment.

Use the login endpoint to get a JWT token.

Copy the token and use it in the Authorization section with Bearer Token for employee requests.

After that, the employee endpoints can be tested.

### Sample Test Accounts

I created two accounts to test my API.

| Username | Email | Password |
|---|---|---|
| testuser1 | testuser1@example.com | Test12345 |
| testuser2 | testuser2@example.com | Test12345 |

These accounts are only for testing my assignment. If they are not already in the database, they can be created using the signup endpoint.

## GitHub Repository

My project is available on GitHub:

https://github.com/Ghazalehaz/101564963_COMP3123_Assignment1

I used Git to track changes to my project.

I also used a `.gitignore` file to avoid uploading unnecessary or private files such as `node_modules` and `.env`.

## Conclusion

In this assignment, I learned more about creating REST APIs using Node.js, Express, and MongoDB.

I practiced working with API routes, JWT authentication, MongoDB models, validation, error handling, and security.

I also used Postman to test the different endpoints and GitHub to manage my project.