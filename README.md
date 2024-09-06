# Digital eCommerce Platform

## Overview

This is a comprehensive eCommerce platform developed using Spring Boot, MySQL, React JS, Postman, and Swagger. It is designed to offer efficient back-end processing, a dynamic front-end, and a secure and reliable user experience.

## Technologies Used

- **Back-End:** Spring Boot
- **Database:** MySQL
- **Front-End:** React JS
- **API Testing:** Postman
- **API Documentation:** Swagger

## Features

- **JWT Authentication:** Implemented to enhance security and user authorization.
- **Distinct User Interfaces:** Designed for both administrative management and customer interactions, resulting in intuitive and user-friendly experiences.
- **API Documentation:** Integrated Swagger for interactive API documentation and testing.

## Description

This eCommerce platform aims to streamline order processing and user management. It utilizes Spring Boot and MySQL for efficient back-end processing and React JS for a dynamic front-end. JWT authentication is used to ensure a secure and reliable user experience. Additionally, the platform features distinct user interfaces tailored for administrative management and customer interactions, providing an intuitive and user-friendly experience. Swagger is included for interactive API documentation, making it easier to explore and test API endpoints.

## Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/TechThrives/eCommerce-Application.git
cd eCommerce-Application
```

#### 2. Set Up the Back-End

- #### Navigate to the backend directory

```bash
cd backend
```

- #### Install dependencies using Maven

```bash
./mvnw install
```

- #### Configure Application Properties

    In the root directory of your Spring Boot project, create a file named `.env`.

    Open the `.env` file and add the following environment variables:

  - **`APPLICATION_NAME`**: The name of the application.

  - **`MONGODB_URI`**: The URI for MongoDB connection.

  - **`DATASOURCE_URL`**: The URL for the MySQL database.

  - **`DATASOURCE_USERNAME`**: The username for MySQL database access.

  - **`DATASOURCE_PASSWORD`**: The password for MySQL database access.

  - **`DATASOURCE_DRIVER`**: The driver class name for MySQL.

  - **`JPA_HIBERNATE_DDL_AUTO`**: Hibernate DDL auto configuration (e.g. `update`, `create`).

  - **`JPA_SHOW_SQL`**: Whether to show SQL statements in logs (`true` or `false`).

  - **`JPA_OPEN_IN_VIEW`**: Whether to keep Hibernate session open during the view rendering (`true` or `false`).

  - **`JPA_GENERATE_DDL`**: Whether to generate the database schema (`true` or `false`).

  - **`DEVTOOLS_LIVERELOAD_ENABLED`**: Whether LiveReload is enabled for Spring Boot DevTools (`true` or `false`).

  - **`LOGGING_LEVEL_ROOT`**: Logging level for the root logger (e.g. `INFO`, `DEBUG`).

  - **`LOGGING_LEVEL_SPRING_WEB`**: Logging level for Spring Web components (e.g. `INFO`, `DEBUG`).

  - **`MVC_VIEW_PREFIX`**: Prefix for view paths in MVC configuration.

  - **`MVC_VIEW_SUFFIX`**: Suffix for view paths in MVC configuration.

  - **`JWT_SECRET_KEY`**: Secret key used for JWT authentication.

  - **`JWT_ACCESS_TOKEN_EXPIRATION`**: Expiration time for access tokens.

  - **`JWT_REFRESH_TOKEN_EXPIRATION`**: Expiration time for refresh tokens.

  - **`MULTIPART_ENABLED`**: Whether multipart file uploads are enabled (`true` or `false`).

  - **`MULTIPART_MAX_FILE_SIZE`**: Maximum file size for multipart uploads.

  - **`MULTIPART_MAX_REQUEST_SIZE`**: Maximum request size for multipart uploads.

  - **`CLOUDINARY_CLOUD_NAME`**: Cloud name for Cloudinary configuration.

  - **`CLOUDINARY_API_KEY`**: API key for Cloudinary.

  - **`CLOUDINARY_API_SECRET`**: API secret for Cloudinary.

  - **`USER_PROFILE_IMAGE_URL`**: Default URL for user profile images.

  - **`STRIPE_SECRET_KEY`**: Secret key for Stripe integration.
    
  - **`MAIL_HOST`**: The mail server’s hostname.
    
  - **`MAIL_PORT`**: The port to connect to the mail server.
    
  - **`MAIL_USERNAME`**: The username for the mail server.
    
  - **`MAIL_PASSWORD`**: The password for the mail server.
    
  - **`MAIL_DEBUG`**: Enable or disable mail debugging.

  - **`BASE_URL`**: Base URL for the Front-End Shop.

  Ensure your Spring Boot application is configured to load environment variables from the `.env` file.

- #### Run the Back-End Server

```bash
./mvnw spring-boot:run
```

#### 3. Front-End - Admin

- #### Navigate to the Admin Front-End Directory

```bash
cd frontend-admin
```

- #### Install Dependencies

```bash
npm install
```

- #### Configure Environment Variables

    In the root directory of your React App, create a file named `.env`.
    
    Open the `.env` file and add the following environment variables:
 
     - **`REACT_APP_BACKEND_URL`**: Defines the base URL of the backend server.

  By setting these environment variables, you ensure that your React app can properly interact with external services and configurations.

- #### Run the Admin Front-End Server

```bash
npm start
```

#### 4. Front-End - Shop

- #### Navigate to the Shop Front-End Directory

```bash
cd frontend-shop
```

- #### Install Dependencies

```bash
npm install
```

- #### Configure Environment Variables

  In the root directory of your React App, create a file named `.env`.
  
  Open the `.env` file and add the following environment variables:

  - **`REACT_APP_BACKEND_URL`**: Defines the base URL of the backend server.

  - **`REACT_APP_STRIPE_PUBLISHABLE_KEY`**: Contains the publishable key for integrating with Stripe's payment gateway.

  - **`REACT_APP_TAX_RATE`**: Specifies the tax rate to be applied in the application.

  By setting these environment variables, you ensure that your React app can properly interact with external services and configurations.

- #### Run the Shop Front-End Server

```bash
npm start
```

#### 5. Access the Application

- #### Back-End:

  http://localhost:8080

- #### Admin Front-End:

  http://localhost:3000

- #### Shop Front-End:

  http://localhost:3001

- #### Swagger Documentation:
  http://localhost:8080/swagger-ui/index.html

## Contributing

We welcome contributions from the community. To contribute to this project, please follow these guidelines:

- Fork the repository
- Create a new branch for your feature or bug fix
- Make your changes and ensure they are well-tested
- Create a pull request to the main branch of the original repository

## Developers

- Omkar Kanade [@omkarkanade](https://www.github.com/omkarkanade)
- Swarup Kanade [@swarupkanade](https://www.github.com/swarupkanade)
