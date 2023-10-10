import { Route, Routes } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import { BoardList } from "../Board/BoardList/BoardList";

const Protected = () => {
  return (
    <Routes>
      <Route
        exact
        path="/board/:id"
        element={<ProtectedRouter Component={BoardList} />}
      />
      <Route
        exact
        path="/notes/:id"
        element={<ProtectedRouter Component={BoardList} />}
      />
    </Routes>
  );
};

export default Protected;
