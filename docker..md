#### Docker build image

docker build --tag quangdangcodegym/nginx-eye:v1.0.0 .

#### Docker run

docker run -p 8071:80 --name nginx-container -d quangdangcodegym/nginx-eye:v1.0.0
