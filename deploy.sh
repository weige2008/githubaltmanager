#!/bin/bash
set -e

cd /opt/githubaltmanager
git pull origin main

cd frontend
npm install --production=false
npm run build
cd ..

cp -r frontend/dist backend/internal/web/dist/

cd backend
go build -o /opt/githubaltmanager/bin/githubaltmanager ./cmd/server/
cd ..

systemctl restart githubaltmanager
echo "Deploy complete"
systemctl status githubaltmanager --no-pager
