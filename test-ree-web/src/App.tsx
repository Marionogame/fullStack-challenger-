import "./App.css";
import "semantic-ui-css/semantic.min.css";

import { Route, Routes } from "react-router";
import Ree from "./Features/Ree";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Ree />} />
    </Routes>
  );
}

export default App;
