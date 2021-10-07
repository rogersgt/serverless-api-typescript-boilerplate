# serverless-api-typescript-boilerplate

## Config
SSM Parameters
### app
Environment variables consumed by the application code prefixed by `/app/<service-name>`
- `SSM_APP_PATH`

### deployment
Configuration options used by serverless to deploy the application in AWS, prefixed by `/deploy/<service-name>`
- `DOMAIN_NAME`: Custom domain name to create (`api.my-domain.com` etc)
- `ACM_CERTIFICATE`: ACM Certificate Arn for the custom domain name
- `HOSTED_ZONE`: Route53 Hosted Zone Name (with period at the end, i.e. `my-domain.`)

## environment variables
### all environments
- `SSM_APP_PATH`
- `STAGE`

### local environment variables only
- `AWS_DYNAMODB_ENDPOINT`

## Local Development
```bash
npm install
docker-compose up -d
npm start
```