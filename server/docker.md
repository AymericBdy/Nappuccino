# building image :
docker build . -t nappuccino

# running image :
docker run -p 3000:3000 -d --name nappuccino-app  nappuccino 

# to rebuild image :
docker stop nappuccino-app
docker container rm nappuccino-app
docker image rm nappuccino:latest
docker build . -t nappuccino