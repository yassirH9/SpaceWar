FROM openjdk:18-jdk-oracle
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} SpaceWarBackend-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/SpaceWarBackend-0.0.1-SNAPSHOT.jar"]