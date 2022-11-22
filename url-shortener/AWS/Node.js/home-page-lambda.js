/**
 this is the code for an AWS Lambda
 that serves up the home page
 for a full-fleged site one would 
 probably use a solution for hosting static
 content, such as AWS Amplify
 
 This function simply returns the contents
 of an HTML file.
 */
const fs = require('fs');

const homePage = fs.readFileSync('./home-page.html').toString();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  let headers = {
    "Content-Type": "text/html"
  };

  try {
    switch (event.routeKey) {
      case "GET /":
        body = homePage;
        break;
    }
  }
  catch (err) {
    statusCode = 400;
    body = err.message;
  }
  
  return {
    statusCode,
    body,
    headers
  };
};
