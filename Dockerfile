FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/productmanagement /usr/share/nginx/html
