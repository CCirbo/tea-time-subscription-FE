import "./Subscription.css";
import tea_image from "../assets/images (3).jpg";

function Subscription({
  id,
  title,
  price
}) {
  return (
    <div className="Subscription">
      <h2>{title}</h2>
      <h3>${price}</h3>
      <img className="tea-picture" src={tea_image} alt="tea image"/>
    </div>
  );
}

export default Subscription;