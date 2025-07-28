#!/bin/bash

echo "killing current process"
pkill -f "payara-micro.jar"

echo "clean and build project..."
mvn clean package

echo "deploying app with payara micro..."
java -jar payara-micro.jar --deploy target/backend.war