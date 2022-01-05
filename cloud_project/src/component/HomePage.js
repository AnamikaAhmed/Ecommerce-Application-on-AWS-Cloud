import cssStyles from "./cssStyles";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import { Grid, TextField } from "@mui/material";
import "bulma";

function HomePage() {
  const classes = cssStyles();
  const [Items, setItems] = useState([]);
  const [filteredItems, setfilteredItems] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function ItemsDisplay() {
      await axios
        // .get("https://tutorial4-api.herokuapp.com/api/users/")
        // .get("http://127.0.0.1:7878/json", { crossdomain: true })
        .get(
          "https://m68zfclr54.execute-api.us-east-1.amazonaws.com/test/json",
          { crossdomain: true }
        )
        .then(response => {
          if (response.data.status) {
            setItems(response.data.data);
          } else {
            setItems([]);
          }
        });
    }
    ItemsDisplay();
  }, []);

  async function handleClick(id) {
    if (
      localStorage.getItem(
        "CognitoIdentityServiceProvider.3j129j5upfa7njjnhnlbg7mtjg.LastAuthUser"
      )
    ) {
      history.push("/item/" + id);
    } else {
      alert("Please Login/SignUp");
    }
  }
  function onSearch(event) {
    event.preventDefault();
    setfilteredItems(event.target.value);
  }

  function Checkbox() {
    axios.post("http://127.0.0.1:5000/express_backend");
  }

  return (
    <div className={classes.root}>
      <NavBar />

      <div className="container has-text-centered">
        <div className="columns is-mobile ">
          <div className="column is-10">
            <Grid item xs={15} sm={6}>
              <TextField
                style={{
                  marginLeft: "380px",
                  marginTop: "30px",
                  width: "100%"
                }}
                fullWidth
                margin="normal"
                id="search"
                type="text"
                label="Search here"
                variant="outlined"
                onChange={onSearch}
              />
            </Grid>
          </div>
        </div>
      </div>

      {Items.filter(response => {
        if (filteredItems === "") {
          return response;
        } else if (
          response.firstName
            .toLowerCase()
            .includes(filteredItems.toLowerCase()) ||
          response.lastName.toLowerCase().includes(filteredItems.toLowerCase())
        ) {
          return response;
        }
        return false;
      }).map(response => (
        <div key={response.id}>
          <div>
            <div className="container">
              <div className="columns is-mobile ">
                <div className="column is-10">
                  <div
                    className="card"
                    style={{ marginTop: 10 }}
                    onClick={() => handleClick(response.id)}
                  >
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-75x75">
                            <img
                              src={response.picture}
                              alt={response.firstName}
                            ></img>

                            {/* <button onClick={Checkbox}>Buy Now</button> */}
                          </figure>
                        </div>
                        <div className="media-content">
                          <div>
                            <label
                              className="label"
                              style={{ textAlign: "left", marginLeft: "20%" }}
                            >
                              Name : {response.title} {response.firstName}
                              {response.lastName}
                            </label>
                          </div>
                          <div>
                            <label
                              className="label"
                              style={{ textAlign: "left", marginLeft: "20%" }}
                            >
                              {/* Email: {response.email} */}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default HomePage;
