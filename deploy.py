import os
from obs import ObsClient

ak = "2ULMZ2VH66TBXMVIEELC"
sk = "goMsfxx2liycAWC5lcVQNxoIVXVG80gDfD0DbPrn"
server = "https://obs.cn-south-1.myhuaweicloud.com"
obsClient = ObsClient(access_key_id=ak, secret_access_key=sk, server=server)
obsClient.putFile(bucketName='fenggp', objectKey='main-app', file_path='dist/')
obsClient.close()
