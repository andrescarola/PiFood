import "./App.css";
import NavBar from "./components/navBar/navBar";
import { Landing, Home, Detail, Form } from "./views";
import { Route, Routes, useLocation } from "react-router-dom";


function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' &&  <NavBar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:detailId" element={<Detail />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
