import { Link } from "react-router-dom";
import Protected from "../Routes/Protected";
import SideBar from "../SideBar/SideBar";
import Header from "../../Components/Header/Header";

const Layout = () => {
  return (
    <div>
      <div style={{ width: "200px" }}>
        <SideBar />
      </div>
      <div>
        <Header />
      </div>
      <div className="container mt-4 pt-5">
        <Protected />
      </div>
    </div>
  );
};

export default Layout;
