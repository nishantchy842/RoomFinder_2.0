import KhaltiCheckout from "khalti-checkout-web";
import config from "./khaltiConfig";

const Khalti = () => {
  let buttonStyles = {
    backgroundColor: "purple",
    padding: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    border: "1px solid white",
  };
  let checkout = new KhaltiCheckout(config);

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => checkout.show({ amount: 1000 })}
        style={buttonStyles}
      >
        Pay Via Khalti
      </button>
    </div>
  );
};

export default Khalti;
