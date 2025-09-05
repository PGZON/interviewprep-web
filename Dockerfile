# Use official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy jar file from target folder into the container
COPY Interviewprep.jar app.jar

# Expose port (default Spring Boot port is 8080)
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
