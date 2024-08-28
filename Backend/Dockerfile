# Stage 1: Build the application
FROM maven:3.8.5-openjdk-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven POM file and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:21-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080 for the application
EXPOSE 8080

# Specify the command to run the JAR file when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]
