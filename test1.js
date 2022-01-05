const express = require("express"); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 8080; //Line 3

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
  res.send("YOUR EXPRESS BACKEND IS CONNECTED TO REACT"); //Line 10

  var AWS = require("aws-sdk");
  // Set the region
  AWS.config.update({
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com",
  accessKeyId: "ASIA6QBIUM67SQXYCAGA",
  secretAccessKey: "QHaChkKHP9rpub2xi8hM7DebMkc3XhZHc9sEMq5L",
  sessionToken:
    "FwoGZXIvYXdzECoaDI1Xu5wwDsjeTk9V7SLCAcsIT3hCM1Y0jKuPlhB7bLyswKipwcHd6+KMVlCstsd5uIVjZrjjwTm2WnaMobg0vQR0m6XcwPSndH5120ayppseKqdX4uH/rJpUlfoI9uBqxbQQZJpKXLL7jjr9PJkzHSPVwOittfLrP2sKRHPvxgmA5HSya/iin2BNW0RfaDdCPjbGrgRtIjgYX+XdM7yRHy+WSBuFawIArUgBmiNmmqE8i2VamNGF+LwaaVbsqvGyCVGoSphQKuOT6+LtCawwOBLfKJGNzo0GMi0WWY/tOvmiEPO9JUJ60CGruXkb76IU7rx6AMYoTljzbg2hsHzw7GCwK0zaYvQ="

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

      });
    }
  });

  var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
  user_ord.replace('"', "");
user_ord.replace("\\", "");
  prod.replace('"',"")
  prod.replace("\\","")
  console.log(user_ord, prod);
  var params = {
    // Remove DelaySeconds parameter and value for FIFO queues
    DelaySeconds: 10,
    MessageAttributes: {
      Title: {
        DataType: "String",
        StringValue: "OrderNotification"
      },
      Author: {
        DataType: "String",
        StringValue: "CloudTitans"
      },
      WeeksOn: {
        DataType: "Number",
        StringValue: "6"
      }
    },
    MessageBody:
      "Your order has been succesfuly placed " +

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

// refered:https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
