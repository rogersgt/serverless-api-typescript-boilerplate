# serverless-api-typescript-boilerplate

## Config
SSM Parameters
### app
Application secrets are consumed from [SSM Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) under the prefix:  `/app/<stage>/<service-name>`

### deployment
Configuration options are consumed from [SSM Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) under the prefix: `/deploy/<service-name>`
- `DOMAIN_NAME`: Custom domain name to create (`api.my-domain.com` etc)
- `ACM_CERTIFICATE`: ACM Certificate Arn for the custom domain name

## environment variables
### all environments
- `SSM_APP_PATH`
- `STAGE`

### local environment variables only
- `AWS_DYNAMODB_ENDPOINT`

## Local Development
* Start the local DynamoDB container and the web server:
```bash
npm install
docker-compose up -d # or "docker compose up -d" on Mac OSX
npm start
```
* Run a POST request to the `/user` route:
```bash
curl -X POST http://localhost:5000/user -H "Content-Type: application/json" -d '{"email":"some-email@domain.tld"}'
```
* Run a GET request to list existing users:
```bash
curl http://localhost:5000/user
```
