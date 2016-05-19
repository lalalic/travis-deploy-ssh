#!/usr/bin/env node

var exec = require('ssh-exec'),
	fs=require("fs"),
	env=process.env,
	opt={
		user: env.DEPLOY_USER,
		host: env.DEPLOY_HOST,
		password: env.DEPLOY_PASSWORD
	},
	target=env.TARGET_DEPLOY_FILE||`./${JSON.parse(fs.readFileSync("package.json","utf8")).name}.travis.deploy.sh`

console.log("target: "+target)

function decode(a){
	if(a && a[0]=="'")
		return a.sustring(1,a.length-2)
	return a
}
var cmds=fs.readFileSync(`.travis.deploy.sh`,{encoding:"utf8"}).replace(/\${(.*?)}/gm,(a,key)=>decode(env[key])||"")

exec(`echo "${cmds}" > ${target}`,opt, error=>{
	if(error) return printerror(error);
	console.log(`passed ${target} to ${env.DEPLOY_HOST}`)
	exec(`chmod u+x ${target}`,opt, error=>{
		if(error) return printerror(error);
		console.log(`made ${target} executable on ${env.DEPLOY_HOST}`)
		exec(`${target} > ${Date.now()}.log`,opt, error=>{
			if(error) return printerror(error);
			console.log(`deployed on ${env.DEPLOY_HOST}`)
		}).pipe(process.stdout)
	}).pipe(process.stdout)
}).pipe(process.stdout)


function printerror(e){
	console.dir(e)
}
