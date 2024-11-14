import Subscription from "../Subscription/Subscription";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Subcontainer.css";

function Subcontainer({subscriptions}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const customer = subscription.attributes.customer;
    if (!customer) return false;

    const customerName = `${customer.first_name} ${customer.last_name}`.toLowerCase();
    return customerName.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by customer name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="Subcontainer">
        {filteredSubscriptions.map((subscription) => (
          <Link key={subscription.id} to={`/subscriptions/${subscription.id}`}>
            <Subscription
              id={subscription.id}
              title={subscription.attributes.title}
              price={subscription.attributes.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Subcontainer;