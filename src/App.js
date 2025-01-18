import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LoadingBar from 'react-top-loading-bar';
import News from "./Components/News";
import "./style.css";

const App = () => {
  const [progress, setProgress] = useState(15);

  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          height={3}
        />
        <Routes>
          <Route
            exact path="/"
            element={<News key="general" setProgress={setProgress} pageSize={9} category="general" />}
          />
          <Route
            exact path="/business"
            element={<News key="business" setProgress={setProgress} pageSize={9} category="business" />}
          />
          <Route
            exact path="/entertainment"
            element={<News key="entertainment" setProgress={setProgress} pageSize={9} category="entertainment" />}
          />
          <Route
            exact path="/sports"
            element={<News key="sports" setProgress={setProgress} pageSize={9} category="sports" />}
          />
          <Route
            exact path="/health"
            element={<News key="health" setProgress={setProgress} pageSize={9} category="health" />}
          />
          <Route
            exact path="/technology"
            element={<News key="technology" setProgress={setProgress} pageSize={9} category="technology" />}
          />
          <Route
            exact path="/general"
            element={<News key="general" setProgress={setProgress} pageSize={9} category="general" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
