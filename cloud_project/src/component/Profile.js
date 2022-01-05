import cssStyles from "./cssStyles";
import { useState, useEffect } from "react";
import "bulma";
import NavBar from "./NavBar";
import { SNS } from "aws-sdk";
import { ConstructionOutlined } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import axios from "axios";
var AWS = require("aws-sdk");
var glo_ARN = "";
function Profile() {
  const classes = cssStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [arn, setarn] = useState("");
  useEffect(() => {
    async function ProfileDetails() {
      setUsername(
        localStorage.getItem(
          "CognitoIdentityServiceProvider.3j129j5upfa7njjnhnlbg7mtjg.LastAuthUser"
        )
      );
      if (username) {
        const UserDetails = JSON.parse(
          atob(
            localStorage
              .getItem(
                `CognitoIdentityServiceProvider.3j129j5upfa7njjnhnlbg7mtjg.${username}.idToken`
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
    var fl_for_reg = false;
    AWS.config.update({
      region: "us-east-1",
      // endpoint: "dynamodb.us-east-1.amazonaws.com",
      accessKeyId: "ASIA6QBIUM67SQXYCAGA",
      secretAccessKey: "QHaChkKHP9rpub2xi8hM7DebMkc3XhZHc9sEMq5L",
      sessionToken:
        "FwoGZXIvYXdzECoaDI1Xu5wwDsjeTk9V7SLCAcsIT3hCM1Y0jKuPlhB7bLyswKipwcHd6+KMVlCstsd5uIVjZrjjwTm2WnaMobg0vQR0m6XcwPSndH5120ayppseKqdX4uH/rJpUlfoI9uBqxbQQZJpKXLL7jjr9PJkzHSPVwOittfLrP2sKRHPvxgmA5HSya/iin2BNW0RfaDdCPjbGrgRtIjgYX+XdM7yRHy+WSBuFawIArUgBmiNmmqE8i2VamNGF+LwaaVbsqvGyCVGoSphQKuOT6+LtCawwOBLfKJGNzo0GMi0WWY/tOvmiEPO9JUJ60CGruXkb76IU7rx6AMYoTljzbg2hsHzw7GCwK0zaYvQ="
    });

    var spl = email.split("@");
    localStorage.setItem("email", email);
    console.log(spl[0]);
    // var createTopicPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    //   .createTopic({ Name: "check" })
    //   .promise();
    axios.post(
      "http://3.86.184.81:5001/subs" + "?email=" + localStorage.getItem("email")
    );
    console.log("check now");

    // Handle promise's fulfilled/rejected states  https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-managing-topics.html

    // Create promise and SNS service object

    // Handle promise's fulfilled/rejected states
  });

  // function Checkbox() {
  //   axios.post("http://127.0.0.1:5000/express_backend");
  // }

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
      {/* <img src="https://mjajaj.s3.amazonaws.com/test1.png" /> */}
    </div>
  );
}

export default Profile;
