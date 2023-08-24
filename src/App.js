import ListPage from "pages/listPage/listPage";
import "./App.css";
import Header from "component/header/header";
import DetailPage from "pages/detailPage/detailPage";

function App() {
  return (
    <div className="App">
      <ListPage></ListPage>
      <DetailPage></DetailPage>
      {/* <Header></Header> */}
    </div>
  );
}

export default App;
