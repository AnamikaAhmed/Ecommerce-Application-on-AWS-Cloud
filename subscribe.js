const express = require("express"); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5001; //Line 3

// This displays message that the server running and listening to specified port  https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
app.listen(port, () => console.log(`Listening on port ${port}`));
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "ASIA6QBIUM67SQXYCAGA",
  secretAccessKey: "QHaChkKHP9rpub2xi8hM7DebMkc3XhZHc9sEMq5L",
  sessionToken:
    "FwoGZXIvYXdzECoaDI1Xu5wwDsjeTk9V7SLCAcsIT3hCM1Y0jKuPlhB7bLyswKipwcHd6+KMVlCstsd5uIVjZrjjwTm2WnaMobg0vQR0m6XcwPSndH5120ayppseKqdX4uH/rJpUlfoI9uBqxbQQZJpKXLL7jjr9PJkzHSPVwOittfLrP2sKRHPvxgmA5HSya/iin2BNW0RfaDdCPjbGrgRtIjgYX+XdM7yRHy+WSBuFawIArUgBmiNmmqE8i2VamNGF+LwaaVbsqvGyCVGoSphQKuOT6+LtCawwOBLfKJGNzo0GMi0WWY/tOvmiEPO9JUJ60CGruXkb76IU7rx6AMYoTljzbg2hsHzw7GCwK0zaYvQ="

});
app.get("/",(req,res)=>{
console.log("Chala")
});

app.post("/subs", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  email_for_sub = req.query.email;
  if(email_for_sub.length>0){
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
}
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
const express = require("express"); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5001; //Line 3

// This displays message that the server running and listening to specified port  https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
// app.listen(port, () => console.log(`Listening on port ${port}`));
// var AWS = require("aws-sdk");
//
// AWS.config.update({
//   region: "us-east-1",
