/**
  this is the code for a Lambda function that is called
  from the url-shortener page.
  it handles put, get, and delete methods
  for shortening URLs
 */
const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const crypto = require('crypto');

const keystr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  let headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "DELETE /items/{id}":
        await dynamo
          .delete({
            TableName: "http-crud-tutorial-items",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /items/{id}":
        let paramsId = event.pathParameters.id;
        let dynamoObj = await dynamo
          .get({
            TableName: "http-crud-tutorial-items",
            Key: {
              id: paramsId
            }
          })
          .promise();
          if (Object.entries(dynamoObj).length == 0){
            statusCode = 404;
            body = {
              "id": paramsId,
              "message": "We do not have a URL for "
                +`the short URL key '${paramsId}.`
            };
          } else{
            statusCode = 302;
            body = {
              "id": paramsId,
              "longUrl": dynamoObj.Item.longUrl
            }
          }
        break;
      case "PUT /items":
        let requestJSON = JSON.parse(event.body);
        let longUrl = requestJSON.longUrl;
        let urlHash = [...crypto.createHash('sha256').update(longUrl).digest()]
          .map(x => x < 62 ? keystr[x] : keystr[Math.floor(x / 62)] + keystr[x % 62])
          .join('')
          .slice(0, 7)
        await dynamo
          .put({
            TableName: "http-crud-tutorial-items",
            Item: {
              id: urlHash,
              longUrl: longUrl
            }
          })
          .promise();
        body = { 
          "id": urlHash, 
          "longUrl": longUrl 
        };
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  }
  catch (err) {
    statusCode = 400;
    body = err.message;
  }
  finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
