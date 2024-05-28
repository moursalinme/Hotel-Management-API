# Hotel Management System API

## Overview

The Hotel Management System API is a RESTful service built with Node.js, Express, and MongoDB. It manages hotel operations such as customer records, room booking, and role-based access control. The API also includes Swagger documentation for easy interaction and testing.

## Features

-   **Authentication & Authorization**: Secure login and role-based access control.
-   **Customer Records**: Manage customer information.
-   **Room Booking**: Book rooms, check availability, and manage reservations.
-   **Roles**:
    -   **Admin**: Full control over the system.
    -   **Receptionist**: Manage customer records and room bookings.

## Technologies Used

-   Node.js
-   Express.js
-   MongoDB with Mongoose
-   JWT for authentication
-   Swagger for API documentation

## Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/moursalinme/Hotel-Management-API.git
cd hotel-management-system
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Environment Variables:**
Create a .env file in the root directory and add the following:
```
DBUrl=mongodb://localhost:127.0.0.1/Your-DB-name
NODE_ENV=development    
JWT_EXP_TIME=30d
JWT_SECRET_KEY=Your-SECRET-PASSWORD
COOKIE_EXP_TIME=30
PASS_SALT_LEN=10
```
4. **Run the Application:**
```bash
npm run start
```
5. **To test the API. Go visit the API docs:**
To visit the api docs go to this route.
```bash
/api-docs
```