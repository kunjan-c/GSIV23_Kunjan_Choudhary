import ListPage from "pages/listPage/listPage";
import "./App.css";
import Header from "component/header/header";
import DetailPage from "pages/detailPage/detailPage";
import { Route, Router, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ListPage></ListPage>} path="/"></Route>
        <Route element={ <DetailPage></DetailPage>} path="detail-page"></Route>
      </Routes>
    </div>
  );
}

export default App;
