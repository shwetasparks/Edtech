# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Certainly! Let's break down the key steps and actions in the provided Node.js code for user authentication, signup, login, OTP generation, and password change:

1. **User Signup (Registration):**
   - Extract user details (firstName, lastName, email, password, etc.) from the request body.
   - Validate if all required fields are present.
   - Check if the provided password and confirm password match.
   - Check if the user with the given email already exists in the database.
   - Verify the provided OTP (One-Time Password) against the most recent OTP stored for the email.
   - Hash the password using bcrypt.
   - Create an additional user profile (if approved as an instructor, set approval to false).
   - Save the user and profile details in the database.
   - Return a success response with the registered user details.

2. **User Login:**
   - Retrieve the email and password from the request body.
   - Validate if both email and password are present.
   - Find the user with the provided email in the database.
   - If the user is not found, return an unauthorized (401) response.
   - Compare the provided password with the hashed password stored in the database using bcrypt.
   - If passwords match, generate a JWT token with user information and set it as a cookie.
   - Return a success response with the JWT token and user details.

3. **Send OTP (Email Verification):**
   - Fetch the email from the request body.
   - Check if the user with the provided email already exists; if yes, return an unauthorized (401) response.
   - Generate a unique OTP using the otp-generator library.
   - Check for the uniqueness of the generated OTP in the database.
   - Create an entry in the OTP collection in the database.
   - Return a success response with the generated OTP.

4. **Change Password:**
   - Retrieve user details from the authenticated user (from JWT token).
   - Get old password, new password, and confirm new password from the request body.
   - Validate the old password by comparing it with the stored hashed password using bcrypt.
   - If the old password is incorrect, return an unauthorized (401) response.
   - Hash the new password using bcrypt.
   - Update the user's password in the database.
   - Send a notification email to the user about the password update.
   - Return a success response indicating that the password has been updated.

**What we are achieving:**
   - Secure user registration with email verification using OTP.
   - Secure user login with JWT token authentication.
   - Ability to send OTP for email verification during signup.
   - Secure password change functionality with proper validation and notification.
   - Overall, the code provides a secure and robust authentication system for user management.

   Certainly! The provided code defines middleware functions for user authentication and role-based authorization using JSON Web Tokens (JWTs). Here's a breakdown of what is happening:

1. **Authentication Middleware (`auth`):**
   - Extracts the JWT from the request cookies, body, or header.
   - If the JWT is missing, returns a 401 Unauthorized response.
   - Verifies the JWT using the secret key stored in the environment variables (`process.env.JWT_SECRET`).
   - If the JWT verification fails, returns a 401 Unauthorized response.
   - If the JWT is valid, stores the decoded payload in the `req.user` for further use.
   - Passes control to the next middleware or request handler.

2. **Authorization Middleware (`isStudent`, `isAdmin`, `isInstructor`):**
   - `isStudent` middleware:
     - Retrieves user details from the database based on the email stored in `req.user`.
     - If the user's account type is not "Student," returns a 401 Unauthorized response.
     - Moves on to the next middleware or request handler if the user is a student.

   - `isAdmin` middleware:
     - Retrieves user details from the database based on the email stored in `req.user`.
     - If the user's account type is not "Admin," returns a 401 Unauthorized response.
     - Moves on to the next middleware or request handler if the user is an admin.

   - `isInstructor` middleware:
     - Retrieves user details from the database based on the email stored in `req.user`.
     - If the user's account type is not "Instructor," returns a 401 Unauthorized response.
     - Moves on to the next middleware or request handler if the user is an instructor.

3. **Common Authorization Process:**
   - Each authorization middleware follows a similar pattern but checks for different account types.
   - Verifies the user's account type against the expected account type for the specific middleware.
   - If the user's account type matches, allows the request to proceed (`next()`).
   - If the user's account type does not match, returns a 401 Unauthorized response.

**What is achieved:**
   - The `auth` middleware ensures that only requests with a valid JWT can proceed, providing a layer of authentication for protected routes.
   - The role-based authorization middlewares (`isStudent`, `isAdmin`, `isInstructor`) restrict access to specific routes based on the user's account type.
   - By using these middlewares in route handlers, the code enforces access control based on user roles, enhancing the security and integrity of the application.#   E d t e c h  
 #   E d t e c h  
 