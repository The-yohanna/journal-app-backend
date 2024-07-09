# Journal backend

To run the project first generate a random JWT secret. You can use 
the following command in your terminal to generate a secret key.

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then create a `.env` file in the root and set the JWT secret key.

```
JWT_SECRET=paste_the_generated_key_here
```

After creating the secret key the following command will start up the project.

```
docker compose up
```

Once the project is started the endpoint documentation can be found in
http://localhost:3000/api/docs.