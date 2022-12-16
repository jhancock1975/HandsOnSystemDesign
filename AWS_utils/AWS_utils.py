import boto3
from botocore.exceptions import ClientError

def create_dynamo_table(table_name, key_schema, attribute_definitions, provisioned_throughput):
    """
            copied from http://bit.ly/3F16E3Q
           Creates an Amazon DynamoDB table that can be used to store movie data.
           The table uses the release year of the movie as the partition key and the
           title as the sort key.
           :param table_name: The name of the table to create.
           :return: The newly created table.
           """
    try:
        table = boto3.resource('dynamodb').create_table(
            TableName=table_name,
            KeySchema=key_schema,
            AttributeDefinitions=attribute_definitions,
            ProvisionedThroughput=provisioned_throughput)
        table.wait_until_exists()
        status_result = ''
    except ClientError as err:
        status_result.append(
            f"Couldn't create table {table_name}. " +\
            "Here's why: {err.response['Error']['Code']}: {err.response['Error']['Message']}")
        raise
    else:
        return f"successfully created DynamoDB table {table_name}."


