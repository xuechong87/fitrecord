#coding:utf-8
'''
author xuechong
2016-01-18
'''
import sys
reload(sys)
sys.setdefaultencoding('utf8')
import os
import re
import codecs
import json
import time

__PRODUCTION__ = "product"
__DEVELOPMENT__ = "dev"
__TEST__ = "test"

__PROJECT_SHORT_NAME__ = "fitrecord$"

modeStr = len(sys.argv)>1 and str(sys.argv[1]) or __DEVELOPMENT__
print("build mode is %s"%modeStr)

cwd = os.getcwd()
getF = lambda x : codecs.open(x,"r+","utf-8")

VERSION_FORMAT='%Y%m%d%H%M%S'
STATIC_RESOURCE_VERSION =time.strftime(VERSION_FORMAT, time.localtime())

def writeFile(content,filePath):
	target = codecs.open(filePath,"w+","utf-8")
	target.write(content)
	target.close()
	pass

def replaceConfigFile(configName,realConfigPath,storeConfigPath):
	print("origin file is :%s"%configName)
	configToUse = configName[0:configName.index(".")] + "_" + modeStr + configName[configName.index("."):]  
	print("replacement file is :%s"%configToUse)

	targetContent = getF(storeConfigPath + configToUse).read()
	print("replacement targetContent is :%s"%targetContent)
	targetFilePath = realConfigPath + configName

	writeFile(targetContent,targetFilePath)
	pass

# app  config
def modifyAppConf():
	if modeStr==__DEVELOPMENT__:
		print("build mode is %s dont modify app xml"%modeStr)
	else :
	    print("modify app conf start, build mode is %s"%modeStr)
        realConfigPath = cwd + os.sep + "runnable" + os.sep
        storeConfigPath = cwd + os.sep + "runnable" + os.sep + "configs" + os.sep

        configName = "appConfig.json"
        print("origin file is :%s"%configName)
        configToUse = configName[0:configName.index(".")] + "_" + modeStr + configName[configName.index("."):]
        print("replacement file is :%s"%configToUse)

        targetContent = getF(storeConfigPath + configToUse).read()
        targetContent = targetContent.replace("${staticResourceVersion}",str(STATIC_RESOURCE_VERSION))
        print("target appconfig content is : %s"%targetContent)
        targetFilePath = realConfigPath + configName

        writeFile(targetContent,targetFilePath)

        print("modify app conf fin")
        pass

	pass
# app  config end


# appConstants
def modifyAppConstants():
	if modeStr==__DEVELOPMENT__:
	    print("build mode is %s dont modify AppConstants"%modeStr)
	else:
		print("modify AppConstants start, build mode is %s"%modeStr)
		realConfigPath = cwd + os.sep + "runnable" + os.sep
		storeConfigPath = cwd + os.sep + "runnable" + os.sep + "configs" + os.sep
		replaceConfigFile("appConstants.json",realConfigPath,storeConfigPath)
		print("modify AppConstants fin")
		pass
	pass
# appConstants end

# redis product config
def modifyRedisConf():
	if modeStr==__DEVELOPMENT__:
	    print("build mode is %s dont modify redis xml"%modeStr)
	else:
		print("modify redis conf start, build mode is %s"%modeStr)
		realConfigPath = cwd + os.sep + "runnable" + os.sep
		storeConfigPath = cwd + os.sep + "runnable" + os.sep + "configs" + os.sep
		replaceConfigFile("redisconf.json",realConfigPath,storeConfigPath)
		print("modify redis conf fin")
		pass
	pass
# redis product config end

# mongo product config
def modifyMongoConf():
	if modeStr==__PRODUCTION__ or modeStr==__TEST__:
		print("modify mongo conf start, build mode is %s"%modeStr)
		realConfigPath = cwd + os.sep + "runnable" + os.sep
		storeConfigPath = cwd + os.sep + "runnable" + os.sep + "configs" + os.sep
		replaceConfigFile("mongoConfig.json",realConfigPath,storeConfigPath)
		print("modify mongo conf fin")
	else :
		print("build mode is %s dont modify mongo config"%modeStr) 
		pass

	pass
# mongo product config end

#build package json
def buildPackageJson():
	if modeStr==__DEVELOPMENT__:
		print("build mode is %s dont build package json "%modeStr) 
		return 
		pass
		
	print("build package json start")
	configjsPath = cwd + os.sep + "public" + os.sep + "app" + os.sep + "main" + os.sep + "config" + os.sep + "config.js"
	print("config.js path is %s"%configjsPath)
	packageJsonPath = cwd + os.sep + "public" + os.sep + "package.json"
	print("package.json path is %s"%packageJsonPath)
	configStr = open(configjsPath).read()
	destFile = open(packageJsonPath,'w+')
	configAliasStr = '"alias"' + configStr.strip('\n')[configStr.index('alias') + 5:configStr.index('},') +1]

	packageJsonWarpStr = '{\
	  "family": "eastlending.com",\
	  "version": "'+ STATIC_RESOURCE_VERSION +'",\
	  "dev_mode": "true",\
	  "name": "eastlending.com_p2p",\
	  "author": "P2PTeam",\
	  "spm": {\
	  ${alias}\
	  },\
	  "devDependencies": {\
	    "grunt": "~0.4.1",\
	    "grunt-bless": "^0.1.1",\
	    "grunt-cmd-concat": "^0.2.2",\
	    "grunt-cmd-transport": "^0.2.4",\
	    "grunt-contrib-clean": "^0.6.0",\
	    "grunt-contrib-coffee": "~0.7.0",\
	    "grunt-contrib-concat": "~0.3.0",\
	    "grunt-contrib-cssmin": "^0.6.1",\
	    "grunt-contrib-jshint": "^0.10.0",\
	    "grunt-contrib-qunit": "^0.5.2",\
	    "grunt-contrib-uglify": "^0.2.0",\
	    "grunt-contrib-watch": "^0.6.1",\
	    "mkdirp": "^0.3.5"\
	  }\
	}'


	packageJsonWarpStr = packageJsonWarpStr.replace('${alias}',configAliasStr).replace('\'','\"')
	ver = sys.version
	if ver.startswith('2.'):
		print ("py version 2.x")
		packageJsonStr = json.dumps(json.loads(packageJsonWarpStr,encoding='utf-8'),\
	            sort_keys=True,indent=4, separators=(',', ':'),encoding='utf-8',ensure_ascii=False)
	else :
		print ("py version 3.x")
		packageJsonStr = json.dumps(json.loads(packageJsonWarpStr,encoding='utf-8'),\
	            sort_keys=True,indent=4, separators=(',', ':'),ensure_ascii=False)

	destFile.write(packageJsonStr)
	destFile.close()
	print("build package json fin")
	pass
#build package json end


# pm2app
def modifyPm2App():
	if modeStr==__DEVELOPMENT__:
		print("build mode is %s dont modify pm2app.json"%modeStr)
	else :
	    print("modify pm2app.json start, build mode is %s"%modeStr)

        configName = "pm2App.json"
        pm2appConfigPath = cwd + os.sep + configName

        print("pm2app.json file is :%s"%pm2appConfigPath)

        originContent = getF(pm2appConfigPath).read()
        print("origin pm2app.json content is : %s"%originContent)
        targetContent = originContent.replace("${version}",str(STATIC_RESOURCE_VERSION))
        print("target pm2app.json content is : %s"%targetContent)

        writeFile(targetContent,pm2appConfigPath)

        print("modify pm2app.json fin")
        pass

	pass
# pm2app end


modifyRedisConf()

modifyAppConf()

modifyAppConstants()

modifyPm2App()