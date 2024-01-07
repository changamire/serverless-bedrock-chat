clean-backend:
	rm -rf backend/node_modules
	rm -rf backend/dist

clean-frontend:
	rm -rf frontend/node_modules
	rm -rf frontend/www

build-backend: clean-backend
	cd backend && npm ci && npx webpack && cd dist && zip api.zip *

build-frontend:
	cd frontend && npm ci && npm run build

deploy-backend:
	cd backend/dist && aws s3 cp api.zip s3://api-deployment-8876729

deploy-frontend:

deploy: