aws s3api head-bucket --bucket api-deployment-335772 || not_exist=true
if [ $not_exist ]; then
  echo "Creating Lambda deployment bucket"
  aws s3api create-bucket --acl private --bucket api-deployment-335772
else
  echo "Lambda deployment bucket exists"
fi