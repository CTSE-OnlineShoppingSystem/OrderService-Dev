FROM openjdk:11
EXPOSE 8080
ADD target/order-service-dev.jar order-service-dev.jar
ENTRYPOINT ["java", "-jar", "order-service-dev.jar"]
