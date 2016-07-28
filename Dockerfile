FROM node:5.0.0-slim
EXPOSE 3000
WORKDIR /app
COPY . /app

RUN chmod a+x ./build ./run ./test

RUN ["./build"]
CMD ./run
