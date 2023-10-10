import { Fragment, useEffect } from "react";
import { BoardList } from "./Pages/Board/BoardList/BoardList.js";
import { Public } from "./Pages/Routes/Public.js";
import { useNavigate } from "react-router-dom";
import Protected from "./Pages/Routes/Protected.js";

const App = () => {
  const navigate = useNavigate();

  const auth = localStorage.getItem("auth");

  useEffect(() => {
    if (!auth) {
      navigate("/login");

      loginRoute();
    }
  }, [auth]);

  const loginRoute = () => {
    localStorage.clear();
    return <Public />;
  };

  return <Fragment>{auth ? <Protected /> : loginRoute()}</Fragment>;
};

export default App;
