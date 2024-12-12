import os
import sys
from obs import ObsClient

ak = sys.argv[1]
sk = sys.argv[2]
server = "https://obs.cn-south-1.myhuaweicloud.com"
obsClient = ObsClient(access_key_id=ak, secret_access_key=sk, server=server)
obsClient.putFile(bucketName='fenggp', objectKey='main-app', file_path='dist/')
obsClient.close()
