import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';
// We import all the components we need in our app
import Navbar from "./components/navbar/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create/create";
import Home from "./components/home/home";
import Checkin from "./components/checkin/checkin";

const App = () => {
  let location = useLocation();
  return (
    <div>
      {location.pathname === '/checkin' ? null : <Navbar />}
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/records" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />

        <Route path="/checkin" element={ <Checkin />} />
      </Routes>
    </div>
  );
};


export default App;
