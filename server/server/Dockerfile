FROM frangauthier/final_project_twa_db2:v1_nodejs_python

#set up application code
WORKDIR /app
COPY . .

RUN npm install
RUN pip3 install pymongo matplotlib pandas

EXPOSE 8080

CMD ["npm", "start"]