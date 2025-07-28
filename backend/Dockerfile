FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /opt/app

COPY backend/pom.xml .
COPY backend/src ./src

RUN mvn clean package

FROM eclipse-temurin:21-jre-alpine

WORKDIR /opt/app

COPY backend/payara-micro.jar .
COPY --from=build /opt/app/target/backend.war .
COPY .env .

RUN apk add --no-cache postgresql-client

EXPOSE 8080
CMD ["java", "-jar", "payara-micro.jar", "--deploy", "backend.war", "--contextRoot", "backend"]