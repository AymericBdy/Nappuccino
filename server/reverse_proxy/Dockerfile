FROM nginx
COPY site /etc/nginx/html
RUN mkdir -p /etc/nginx/certs
RUN mkdir -p /etc/nginx/logs
COPY certs/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY certs/privkey.pem /etc/nginx/certs/privkey.pem
COPY nginx.conf /etc/nginx/nginx.conf

#to run : docker run -p 80:80 -p 443:443 -v <path_to_log_folder>:/etc/nginx/logs -d --name reverse-proxy-nginx --rm reverse-proxy-nginx:<version_tag> 
