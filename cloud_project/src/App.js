import "./App.css";
import HomePage from "./component/HomePage";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ItemPage from "./component/ItemPage";
import Profile from "./component/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
          {localStorage.getItem(
            "CognitoIdentityServiceProvider.3j129j5upfa7njjnhnlbg7mtjg.LastAuthUser"
          ) !== undefined ? (
            <>
              <Route exact path="/item/:id">
                <ItemPage></ItemPage>
              </Route>
              <Route exact path="/profile">
                <Profile></Profile>
              </Route>
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
