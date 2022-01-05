import cssStyles from "./cssStyles";
import { useState, useEffect } from "react";
import "bulma";
import NavBar from "./NavBar";
import { SNS } from "aws-sdk";
import { ConstructionOutlined } from "@mui/icons-material";
var AWS = require("aws-sdk");
function Profile() {
  const classes = cssStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    async function ProfileDetails() {
      setUsername(
        localStorage.getItem(
          "CognitoIdentityServiceProvider.28oarn9fvjnicau4497osq4he.LastAuthUser"
        )
      );
      if (username) {
        const UserDetails = JSON.parse(
          atob(
            localStorage
              .getItem(
                `CognitoIdentityServiceProvider.28oarn9fvjnicau4497osq4he.${username}.idToken`
              )
              .split(".")[1]
          )
        );
        setName(UserDetails.name);
        setEmail(UserDetails.email);
      }
    }
    ProfileDetails();
    /**Starts here-RIDAM */
    var fl_for_reg = true;
    AWS.config.update({
      region: "us-east-1",
      endpoint: "dynamodb.us-east-1.amazonaws.com",
      accessKeyId: "ASIA6QBIUM67U3POBDHR",
      secretAccessKey: "DyRA29C1OeQT9FGgvmTDdeXT4g6/Uqeym0qH36S4",
      sessionToken:
        "FwoGZXIvYXdzEKT//////////wEaDMcZw0TNNtgF63LJsSLCAR0Gicmb3Pm/++kgquZ/IwyX05/HmMrGnD2qCB39GuPt2qP6RaBaFy4N4pI3sVXetLtbphx1Riy6Cu//RjBFNakCFt0beePtxhhtXjheBTWHmQeew8mS4G9/8Nf3oaAnoFE8P77wqNWsd0neXthKMA1pnXCPcpxdlO2r+E8dpBrIOdyN2xFwA4KNGVbH8EDSMkY4vD9Yj4AKQTtiBsNWEOCOz3GGn8yPrt8WR09yBIHqTXS1Rzr1J8LY/7lT8y4WBSy6KLzFsI0GMi2oMfZKj8Om1LtaNRMY9hkYzUObi2Ix4dEb36WsWTXrXjkiYsfT5SI8r7+7Ges="
    });

    var db = new AWS.DynamoDB.DocumentClient();

    var param = {
      TableName: "test",
      Key: {
        id: "Ridams"
      }
    };

    db.scan(param, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        data.Items.forEach(function (d) {
          console.log(
            "Check here please",
            d.registered == false,
            d.id == email
          );
          if (d.id == email && d.registered == false) {
            fl_for_reg = false;

            console.log("set for now");
            var params = {
              Protocol: "EMAIL" /* required */,
              TopicArn:
                "arn:aws:sns:us-east-1:996517636031:check" /* required */,
              Endpoint: email
            };
            console.log(fl_for_reg, "*****************2", params);
            // Create promise and SNS service object
            var subscribePromise = new AWS.SNS({
              apiVersion: "2010-03-31"
            })
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
          }
        });
      }
    });

    // Create subscribe/email parameters
    console.log(email, fl_for_reg);
    if (fl_for_reg == false) {
      console.log(fl_for_reg, "*****************");
      // var params = {
      //   Protocol: "EMAIL" /* required */,
      //   TopicArn: "arn:aws:sns:us-east-1:996517636031:check" /* required */,
      //   Endpoint: email
      // };
      // console.log(fl_for_reg, "*****************2", email);
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
      //     console.log(err);
      //     console.error(err, err.stack);
      //   });
      /**Ends here-RIDAM */
      /**
       * Trial for listing subscriptions
       */
    }
  });

  return (
    <div className={classes.root}>
      <NavBar />
      <h1 className="title"> Profile Details</h1>
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <div>
                <label
                  className="label"
                  style={{ textAlign: "left", marginLeft: "20%" }}
                >
                  Name : {name}
                </label>
              </div>
              <div>
                <label
                  className="label"
                  style={{ textAlign: "left", marginLeft: "20%" }}
                >
                  UserName : {username}
                </label>
              </div>
              <div>
                <label
                  className="label"
                  style={{ textAlign: "left", marginLeft: "20%" }}
                >
                  Email: {email}
                </label>
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
      <img src="https://mjajaj.s3.amazonaws.com/test1.png" />
    </div>
  );
}

export default Profile;
