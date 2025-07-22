#!/bin/bash

echo "killing current process"
pkill -f "payara-micro-6.2025.7.jar"

echo "clean and build project..."
mvn clean package

echo "deploying app with payara micro..."
java -jar payara-micro-6.2025.7.jar --deploy target/backend.war