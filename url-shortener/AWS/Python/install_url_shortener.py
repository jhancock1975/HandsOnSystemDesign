from AWS_utils import create_dynamo_table
import boto3

class ShortenerInstaller(object):
    pass


key_schema = [
    {'AttributeName': 'year', 'KeyType': 'HASH'},  # Partition key
    {'AttributeName': 'title', 'KeyType': 'RANGE'}  # Sort key
]
attribute_definitions = [
    {'AttributeName': 'year', 'AttributeType': 'N'},
    {'AttributeName': 'title', 'AttributeType': 'S'}
]
provisioned_throughput = {'ReadCapacityUnits': 10, 'WriteCapacityUnits': 10}
# print(create_dynamo_table('test', key_schema, attribute_definitions, provisioned_throughput))
s3 = boto3.resource('s3')
bucket_name = 'jh-2022-12-16-13-53'
s3.create_bucket(Bucket='hands.on.system.design')
# s3.Object(bucket_name, 'hello.txt').put(Body=b'hello s3 people')
#s3.Object(bucket_name, 'hello.txt').delete()
#bucket = s3.Bucket(bucket_name)
#bucket.delete()