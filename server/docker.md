# building image :
docker build . -t nappuccino:<version>

# running image :
docker run --rm -p 3000:3000 -v /home/jenkins/Nappuccino-logs:/usr/src/app/logs -e NAPPUCCINO_VERSION=<version> -d --name nappuccino-app  nappuccino:<version>

# to rebuild image :
docker stop nappuccino-app
docker container rm nappuccino-app
docker image rm nappuccino:latest
docker build . -t nappuccino

# postgres db : **to be modified**
docker run -d --name=nappuccino-db -p 5432:5432 -v /<path_to>/Nappuccino/server/postgre_data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=[your_password] postgres
