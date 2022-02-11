# building image :
docker build . -t nappuccino

# running image :
docker run -p 3000:3000 -d --name nappuccino-app  nappuccino 

# to rebuild image :
docker stop nappuccino-app
docker container rm nappuccino-app
docker image rm nappuccino:latest
docker build . -t nappuccino

# postgres db : **to be modified**
docker run -d --name=nappuccino-db -p 5432:5432 -v /<path_to>/Nappuccino/server/postgre_data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=[your_password] postgres
