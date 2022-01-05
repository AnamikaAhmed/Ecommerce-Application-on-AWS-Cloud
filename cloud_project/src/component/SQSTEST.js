const express = require("express"); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port  https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
user_ord = "";
prod = "";

app.post("/express_backend", (req, res) => {
  console.log(req.url);
  user_ord = String(req.query.user);
  prod = req.query.prod;
  console.log("called");
  res.header("Access-Control-Allow-Origin", "*");
  // res.send("YOUR EXPRESS BACKEND IS CONNECTED TO REACT"); //Line 10

  var AWS = require("aws-sdk");
  // Set the region
  AWS.config.update({
    region: "us-east-1",
    endpoint: "dynamodb.us-east-1.amazonaws.com",
    accessKeyId: "ASIA6QBIUM677Q4PBUSV",
    secretAccessKey: "20m3+PGRoIMZx1v99in+58l+42J5JI0cXKIJwzo8",
    sessionToken:
      "FwoGZXIvYXdzEBMaDPB1O2bqutHdqUa4sSLCAcymFOf1IuNeF+lGN+F43h2jvyZCef+SgK+GzhVlVV76J1wJFF4RecKcN4/t78MrGuH/go1LwLo650LNJ6MqI52vRsmShevDincAgPsZCsgWxrgJVLHU1mV2psQr1vqt69bLayrWVDxSq9RoNLWCPZ47iNMd/NXusreJWRsJHZTq0R/r4tnURNwzLVopIjgTc4JmkhDRWLnNFtZ9TGCTLVwt8bm43J0VUyyMdQLki0RVb35sbsWopjt5SJ3EGy+LbLCHKJzvyI0GMi1gDYZQLSLW5PQZzILOb13I0yR76f7fEV4jBLiE0iYqU0QQebvnPAGyBAER7S0="
  });
  var db = new AWS.DynamoDB.DocumentClient();

  var param23 = {
    TableName: "orders",
    Key: {
      // id: "cloth"
    }
  };
  db.scan(param23, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      data.Items.forEach(function (d) {
        console.log("*****", d.id);
      });
    }
  });

  var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
  user_ord.replace('"', "");
  user_ord.replace("\\", "");
  console.log(user_ord, prod);
  var params = {
    // change all this
    DelaySeconds: 10,
    MessageAttributes: {
      Title: {
        DataType: "String",
        StringValue: "The Whistler"
      },
      Author: {
        DataType: "String",
        StringValue: "John Grisham"
      },
      WeeksOn: {
        DataType: "Number",
        StringValue: "6"
      }
    },
    MessageBody:
      "Your order has been succesfuly placed " +
      user_ord.replace('"', "") +
      " product ordered " +
      prod,
    //   MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
    //   MessageGroupId: "Group1",  // Required for FIFO queues
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/996517636031/hello"
  };

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });
});

// // Load the AWS SDK for Node.js
// var AWS = require("aws-sdk");
// // Set the region
// AWS.config.update({
//   region: "us-east-1",
//   // endpoint: "dynamodb.us-east-1.amazonaws.com",
//   accessKeyId: "ASIA6QBIUM67U3POBDHR",
//   secretAccessKey: "DyRA29C1OeQT9FGgvmTDdeXT4g6/Uqeym0qH36S4",
//   sessionToken:
//     "FwoGZXIvYXdzEKT//////////wEaDMcZw0TNNtgF63LJsSLCAR0Gicmb3Pm/++kgquZ/IwyX05/HmMrGnD2qCB39GuPt2qP6RaBaFy4N4pI3sVXetLtbphx1Riy6Cu//RjBFNakCFt0beePtxhhtXjheBTWHmQeew8mS4G9/8Nf3oaAnoFE8P77wqNWsd0neXthKMA1pnXCPcpxdlO2r+E8dpBrIOdyN2xFwA4KNGVbH8EDSMkY4vD9Yj4AKQTtiBsNWEOCOz3GGn8yPrt8WR09yBIHqTXS1Rzr1J8LY/7lT8y4WBSy6KLzFsI0GMi2oMfZKj8Om1LtaNRMY9hkYzUObi2Ix4dEb36WsWTXrXjkiYsfT5SI8r7+7Ges="
// });

// var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

// var params = {
//   // Remove DelaySeconds parameter and value for FIFO queues
//   DelaySeconds: 10,
//   MessageAttributes: {
//     Title: {
//       DataType: "String",
//       StringValue: "The Whistler"
//     },
//     Author: {
//       DataType: "String",
//       StringValue: "John Grisham"
//     },
//     WeeksOn: {
//       DataType: "Number",
//       StringValue: "6"
//     }
//   },
//   MessageBody: "Jaggi its working",
//   //   MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
//   //   MessageGroupId: "Group1",  // Required for FIFO queues
//   QueueUrl: "https://sqs.us-east-1.amazonaws.com/996517636031/hello"
// };

// sqs.sendMessage(params, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.MessageId);
//   }
// });

//This file will act when we have an order ready and want to notify the customer

// Refered:https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
