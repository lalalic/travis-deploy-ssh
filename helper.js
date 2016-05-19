#!/usr/bin/env node

var fs=require("fs")

;(function makeTravisDeploy(){
    fs.appendFileSync(`.travis.yml`,
`

#created by travis-deploy-ssh

env:
 - DEPLOY_HOST=
 - DEPLOY_USER=
 - DEPLOY_PASSWORD=
# - DEPLOY_TARGET_FILE=
before_deploy:
 - chmod u+x node_modules/travis-deploy-ssh/deploy.sh
deploy:
 provider: script
 skip_cleanup: true
 script: node_modules/travis-deploy-ssh/deploy.sh`,"utf8", error=>console.error)
})();



(function createSampleDeployScript(){
    fs.appendFileSync(`.travis.deploy.sh`,
`
#built-in env variables for connection to remote host with ssh, you have to set value in .travis.yml, or travis-ci.org
#DEPLOY_HOST, DEPLOY_USER, DEPLOY_PASSWORD, TARGET_DEPLOY_FILE[optional, default [DEPLOY_USER's home/__deploy.sh]]

#you can define environment variable to use in this script file,
#and it will be replaced with value defined in .travis.yml when deploying, such as
# cd ${"${git_repository_on_deploy_host}"} # git_repository_on_deploy_host should be defined in .travis.yml
# git pull

echo start
#whatever you want to do on deployment target host
echo end
`,"utf8", error=>console.error)
})();
