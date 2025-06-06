import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomeContent";

const App = () => {

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home /> } />
      </Routes>
    </Router>
  );
};

export default App;