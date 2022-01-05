const express = require("express"); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5001; //Line 3

// This displays message that the server running and listening to specified port  https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
app.listen(port, () => console.log(`Listening on port ${port}`));
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "dynamodb.us-east-1.amazonaws.com",
  accessKeyId: "ASIA6QBIUM67SCINACMQ",
  secretAccessKey: "wYqlCPTWo95LBham/EekUPc0hZxPTKfZBSImyDmz",
  sessionToken:
    "FwoGZXIvYXdzEBcaDD4tPm2IQnNcko9QfyLCAfY6PQcydj7fMoO9U/0qrIRebmH25qVLwjC+oNIKC6VbA+jUNzS3+8x7Ihp1SB08zEbthXzaZ2kgynsG21dDto0Qd2sXvuZhW+m0jfi6NPn9Ytbq33d0pISYq1A6SG96OF8gA92xkFTeH2Kyb/NOocBOwqeqQW5UlhyR+ZAEdbF9EmIKQk8go9Kd0dwspqK2qIxmqUGwSMvKeNUrPEqmNP4cLENWo0a80rFfMLhqAjla0/P4JL+NsMGwXP7sh4sz22wWKP/kyY0GMi24XJOptydWzQGsocrMdNPwISoYa4pIzgVqwnUUXWjfqFwCOOVSvh84klV0Jp0="
});

app.post("/subs", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  email_for_sub = req.query.email;
  console.log("Email is", req.query.email);
  var glo_ARN = "";
  var createTopicPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .createTopic({ Name: "check" })
    .promise();
  console.log("check now");
  // Handle promise's fulfilled/rejected states  https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-managing-topics.html
  createTopicPromise
    .then(function (data) {
      console.log("Topic ARN is " + data.TopicArn);
      glo_ARN = data.TopicArn;
      var params = {
        Protocol: "EMAIL" /* required */,
        // TopicArn: "arn:aws:sns:us-east-1:996517636031:check" /* required */,
        TopicArn: glo_ARN,
        Endpoint: email_for_sub
      };

      // Create promise and SNS service object

      var subscribePromise = new AWS.SNS({ apiVersion: "2010-03-31" })
        .subscribe(params)
        .promise();

      // Handle promise's fulfilled/rejected states
      subscribePromise
        .then(function (data) {
          console.log("Subscription ARN is " + data.SubscriptionArn);
        })
        .catch(function (err) {
          console.error(err, err.stack);
        });
    })
    .catch(function (err) {
      console.log(err.message);
    });
});
// var params = {
//   Protocol: "EMAIL" /* required */,
//   // TopicArn: "arn:aws:sns:us-east-1:996517636031:check" /* required */,
//   TopicArn: glo_ARN,
//   Endpoint: "ltg34753@boofx.com"
// };

// // Create promise and SNS service object

// var subscribePromise = new AWS.SNS({ apiVersion: "2010-03-31" })
//   .subscribe(params)
//   .promise();

// // Handle promise's fulfilled/rejected states
// subscribePromise
//   .then(function (data) {
//     console.log("Subscription ARN is " + data.SubscriptionArn);
//   })
//   .catch(function (err) {
//     console.error(err, err.stack);
//   });
