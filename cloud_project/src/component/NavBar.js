import cssStyles from "./cssStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useHistory } from "react-router";
import authentication from "../config/awscognitoUtils";

function NavBar() {
  const history = useHistory();
  const classes = cssStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function authen() {
      if (
        !localStorage.getItem(
          "CognitoIdentityServiceProvider.3j129j5upfa7njjnhnlbg7mtjg.LastAuthUser"
        )
      ) {
        await authentication.parseCognitoWebResponse(window.location.href);
      }
      const username = localStorage.getItem(
        "CognitoIdentityServiceProvider.3j129j5upfa7njjnhnlbg7mtjg.LastAuthUser"
      );
      if (username) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }
    authen();
  }, []);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleprofile = event => {
    event.preventDefault();
    history.push("/profile");
    handleClose();
  };

  const handlelogout = event => {
    event.preventDefault();
    setAuth(false);
    localStorage.clear();
    history.push("/");
    handleClose();
  };
  const homeclick = () => {
    history.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Dal-Merchandise
        </Typography>
        <Button
          style={{ marginRight: 10, marginLeft: 10 }}
          color="inherit"
          onClick={homeclick}
        >
          Home
        </Button>

        {!auth && (
          <ButtonGroup>
            <Button
              style={{
                marginRight: 10,
                marginLeft: 10,
                backgroundColor: "white",
                color: "black"
              }}
            >
              <a href="https://cloudproject5409.auth.us-east-1.amazoncognito.com/login?client_id=3j129j5upfa7njjnhnlbg7mtjg&response_type=token&scope=phone+email+openid+aws.cognito.signin.user.admin+profile&redirect_uri=http://localhost:3000/">
                {" "}
                SignUp/Login
              </a>
            </Button>
          </ButtonGroup>
        )}
        {auth && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleprofile}>Profile</MenuItem>
              <MenuItem onClick={handlelogout}>
                <a href="https://cloudproject5409.auth.us-east-1.amazoncognito.com/logout?client_id=3j129j5upfa7njjnhnlbg7mtjg&logout_uri=http://localhost:3000/">
                  Logout{" "}
                </a>
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
