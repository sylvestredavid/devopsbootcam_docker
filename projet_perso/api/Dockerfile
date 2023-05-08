FROM gradle:jdk11 as builder
WORKDIR /app
COPY . .
RUN cd /app && gradle build

FROM openjdk:11-jre-slim as prod
COPY --from=builder /app/build/libs/api.jar api.jar
EXPOSE 5000
CMD java -jar ./api.jar --server.port=5000

