
#!/bin/bash
cd /home/ubuntu/Dajavas/server
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')
export REACT_APP_KAKAO_REST_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names REACT_APP_KAKAO_REST_KEY --query Parameters[0].Value | sed 's/"//g')
export REACT_APP_GOOGLE_REST_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names REACT_APP_GOOGLE_REST_KEY --query Parameters[0].Value | sed 's/"//g')
export REACT_APP_GOOGLE_REST_KEY_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REACT_APP_GOOGLE_REST_KEY_SECRET --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
authbind --deep pm2 start app.js