import axios from "axios";
import cssStyles from "./cssStyles";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bulma";
import NavBar from "./NavBar";
var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com",
  accessKeyId: "ASIA6QBIUM67SQXYCAGA",
  secretAccessKey: "QHaChkKHP9rpub2xi8hM7DebMkc3XhZHc9sEMq5L",
  sessionToken:
    "FwoGZXIvYXdzECoaDI1Xu5wwDsjeTk9V7SLCAcsIT3hCM1Y0jKuPlhB7bLyswKipwcHd6+KMVlCstsd5uIVjZrjjwTm2WnaMobg0vQR0m6XcwPSndH5120ayppseKqdX4uH/rJpUlfoI9uBqxbQQZJpKXLL7jjr9PJkzHSPVwOittfLrP2sKRHPvxgmA5HSya/iin2BNW0RfaDdCPjbGrgRtIjgYX+XdM7yRHy+WSBuFawIArUgBmiNmmqE8i2VamNGF+LwaaVbsqvGyCVGoSphQKuOT6+LtCawwOBLfKJGNzo0GMi0WWY/tOvmiEPO9JUJ60CGruXkb76IU7rx6AMYoTljzbg2hsHzw7GCwK0zaYvQ="
});
function sendItems() {
  var param23 = {
    TableName: "orders",
    Item: {
      id: localStorage.getItem("Prod_Name"),
      payment: "true",
      user: localStorage.getItem("email")
    }
  };
  var db = new AWS.DynamoDB.DocumentClient();
  db.put(param23, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
}

function ItemPage() {
  function Checkbox() {
    axios.post(
      // "http://127.0.0.1:5000/express_backend?user=" +
      //   localStorage.getItem("email") +
      //   "&prod=" +
      //   localStorage.getItem("Prod_Name")
      "http://3.82.208.146:8080/express_backend?user=" +
        localStorage.getItem("email") +
        "&prod=" +
        localStorage.getItem("Prod_Name")
    );
  }
  const classes = cssStyles();
  const [Item, setItem] = useState([]);
  const params = useParams();
  useEffect(() => {
    async function ItemDetails() {
      await axios
        // .get(`https://tutorial4-api.herokuapp.com/api/users/${params.id}`),
        .get(
          "https://tnjot2gpm7.execute-api.us-east-1.amazonaws.com/test/items?user=" +
            `${params.id}`,
          { crossdomain: true }
        )
        .then(response => {
          setItem(response.data.data);
        });
    }
    ItemDetails();
    localStorage.setItem("Prod_Name", JSON.stringify(Item.firstName));
    // var params23 = {
    //   TableName: "CUSTOMER_LIST",
    //   Item: {
    //     id: "AAAgya !!!"
    //   }
    // };
    // var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
    // // Call DynamoDB to add the item to the table
    // ddb.putItem(params23, function (err, data) {
    //   console.log("hogaya");
    // });

    // db.scan(param23, function (err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     data.Items.forEach(function (d) {
    //       console.log("*****", d.registered);
    //     });
    //   }
    // });

    sendItems();
  });

  return (
    <div className={classes.root}>
      <NavBar />
      <h1 className="title"> Item Details</h1>
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-100x100">
                <img src={Item.picture} alt={Item.firstName}></img>
              </figure>
            </div>
            <div className="media-content">
              <div>
                <label
                  className="label"
                  style={{ textAlign: "left", marginLeft: "20%" }}
                >
                  Name : {Item.title} {Item.firstName} {Item.lastName}
                  <button onClick={Checkbox}>Buy Now</button>
                </label>
              </div>
              <div>
                <label
                  className="label"
                  style={{ textAlign: "left", marginLeft: "20%" }}
                >
                  {/* Email: {Item.email} */}
                </label>
              </div>
              <div></div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;

/**
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
 */
