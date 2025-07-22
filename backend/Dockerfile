FROM eclipse-temurin:latest

WORKDIR /opt/app

COPY backend/payara-micro.jar .

COPY backend/target/backend.war .

EXPOSE 8080

# Comando para iniciar el servidor
CMD ["java", "-jar", "payara-micro.jar", "--deploy", "backend.war", "--contextRoot", "backend"]