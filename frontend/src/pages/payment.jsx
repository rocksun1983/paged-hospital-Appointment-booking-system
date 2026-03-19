import { toast } from "react-toastify";

export default function Payment() {

  const payNow = () => {
    toast.success("Redirecting to Payment Gateway...");
    
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Payment</h2>
        <p>Consultation Fee: ₦5,000</p>
        <button onClick={payNow}>Pay Now</button>
      </div>
    </div>
  );
}