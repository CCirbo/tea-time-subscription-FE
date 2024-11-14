import React from "react";
import "./App.css";
import Subcontainer from "../Subcontainer/Subcontainer";
import SubscriptionDetails from "../SubscriptionDetail/SubscriptionDetail";
import { useEffect, useState } from "react";
import Header from "../Header/Header";  
import { Route, Routes } from "react-router-dom";

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");

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

  // const filteredSubscriptions = subscriptions.filter((subscription) => {
  //   const customer = subscription.attributes.customer;
  //   if (!customer) return false;

  //   const customerName = `${customer.first_name} ${customer.last_name}`.toLowerCase();
  //   return customerName.includes(searchTerm.toLowerCase());
  // });


  return (
    <div className="App">
      <Header />
      {/* <input
        type="text"
        placeholder="Search by customer name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input" */}
      {/* /> */}
      <Routes>
        <Route
          path="/"
          element={<Subcontainer subscriptions={subscriptions} />}
        />
        <Route
          path="/subscriptions/:id"
          element={
            <SubscriptionDetails
            // getStatus={getStatus}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
