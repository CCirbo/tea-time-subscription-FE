import React from "react";
import "./App.css";
import Subcontainer from "../Subcontainer/Subcontainer";
import SubscriptionDetails from "../SubscriptionDetail/SubscriptionDetail";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
 
  function getSubscriptions() {
    fetch("http://localhost:3001/api/v1/subscriptions")
      .then((response) => response.json())
      .then((data) => setSubscriptions([...data.data]))
      .catch((error) => {
        console.error("Error fetching subscriptions:", error);
      });
  }

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Subcontainer subscriptions={subscriptions} />}
        />
        <Route path="/subscriptions/:id" element={<SubscriptionDetails />} />
      </Routes>
    </div>
  );
}

export default App;
