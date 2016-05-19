# travis-deploy-ssh
It helps travis-ci.org pass .travis.deploy.sh to DEPLOY_HOST with account DEPLOY_USER/DEPLOY_PASSWORD, and run it on DEPLOY_HOST to finish deploy on server.

# install
```
npm install travis-deploy-ssh
```

run ```travis-deploy``` on the target project, and it would help create .travis.deploy.sh and change .travis.yml to make it ready for deploy from travis-ci.org.

then check ```.travis.yml``` to set following env variables, or set it on travis-ci.org for senstive data.
* DEPLOY_USER
* DEPLOY_HOST
* DEPLOY_PASSWORD
* DEPLOY_TARGET_FILE: optional, the path where .travis.deploy.sh will be put on DEPLOY_HOST.

then customize ```.travis.deploy.sh```. please note that it would run on DEPLOY_HOST

# license
MIT
