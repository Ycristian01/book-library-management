FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /opt/app

COPY backend/pom.xml .
COPY backend/src ./src

RUN mvn clean package

COPY backend/payara-micro.jar .

COPY backend/target/backend.war .

EXPOSE 8080

CMD ["java", "-jar", "payara-micro.jar", "--deploy", "backend.war", "--contextRoot", "backend"]