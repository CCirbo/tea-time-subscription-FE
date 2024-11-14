import React from "react";
import "./SubscriptionDetail.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import coffee_image from "../assets/coffee-cup.png";
import tea_cup_image from "../assets/cup-green-tea-icon-flat-vector-illustration-herbal-color-white-background-81358169.jpg";

function normalizeSubscriptionData(subscriptionData) {
  if (!subscriptionData) return null;

  if (subscriptionData.data) {
    return {
      id: subscriptionData.data.id,
      ...subscriptionData.data.attributes,
    };
  }

  return {
    id: subscriptionData.id,
    ...subscriptionData.attributes,
  };
}

function SubscriptionDetail() {
  const { id } = useParams();
  const [subscription, setSubscription] = useState({});
  const [error, setError] = useState(null);

  function getDetails() {
    fetch(`http://localhost:3001/api/v1/subscriptions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const normalizedData = normalizeSubscriptionData(data);
        console.log("normalized data", normalizedData);
        setSubscription(normalizedData);
      })
      .catch((error) => {
        console.error("Error fetching subscription:", error);
        setError("Failed to load subscription details.");
      });
  }

  function toggleStatus() {
    let newStatus;
    if (subscription.status === "active") {
      newStatus = "deactivated";
    } else {
      newStatus = "active";
    }

    fetch(`http://localhost:3001/api/v1/subscriptions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscription: {
          status: newStatus,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedSubscription = normalizeSubscriptionData(data);
        setSubscription(updatedSubscription);
      })
      .catch((error) => {
        console.error("Error updating subscription:", error);
      });
  }

  useEffect(() => {
    getDetails();
  }, [id]);

  function getStatusButtonText() {
    if (subscription.status === "active") {
      return "Deactivate";
    } else {
      return "Activate";
    }
  }

  return (
    <div className="subscription-details">
      <div className="home-button">
        <Link to="/">
          <img src={coffee_image} alt="home button" />
        </Link>
      </div>
      <h2>{subscription.title}</h2>
      <h3>Price: ${subscription.price}</h3>
      <p>Description: {subscription.description}</p>
      <p>Status: {subscription.status}</p>
      <button onClick={toggleStatus}>{getStatusButtonText()}</button>
      <p>Frequency: {subscription.frequency}</p>
      {subscription.customer && (
        <div className="customer-box">
          <h4>Customer Info</h4>
          <p>
            Name: {subscription.customer.first_name}{" "}
            {subscription.customer.last_name}
          </p>
          <p>Email: {subscription.customer.email}</p>
          <p>Address: {subscription.customer.address}</p>
        </div>
      )}
      {subscription.tea && (
        <div className="tea-box">
          <h4>Tea Details</h4>
          <img
            src={tea_cup_image}
            alt={`${subscription.tea.title}`}
            className="tea-image"
          />
          <p>Type: {subscription.tea.title}</p>
          <p>Description: {subscription.tea.description}</p>
          <p>Temperature: {subscription.tea.temperature}°C</p>
          <p>Brew Time: {subscription.tea.brew_time} minutes</p>
        </div>
      )}
    </div>
  );
}

export default SubscriptionDetail;
