import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/home";
import Mypost from "./components/mypost";
import Myprofile from "./components/myprofile";
import Signup from "./components/signup";
import Login from "./components/login";
import ErrorPage from "./components/errorpage";
import Addpost from "./components/addpost";

function App() {
  const history = useHistory();
  // const [IsLogin, setIsLogin] = useState(false)

  // useEffect(() => {
  //   if (localStorage.getItem('jwt')) {
  //     setIsLogin(true);
  //   }
  // }, [])

  if (localStorage.getItem("Username")) {
    history.push("/");
  } else {
    history.push("/login");
  }

  return (
    <div className="App">
      {/* <Header IsLogin={IsLogin} /> */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/addpost" component={Addpost} />
        <Route path="/mypost" component={Mypost} />
        <Route path="/myprofile" component={Myprofile} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
