export default function PaystackButton({ email, amount, onSuccess }) {

  function payWithPaystack(){

    const handler = window.PaystackPop.setup({

      key: "pk_test_33a3cd12ed834b5f76fe28c21ec167896f160764",

      email: email,

      amount: amount * 100,

      currency: "NGN",

      callback: function(response){

        onSuccess(response.reference);

      },

      onClose: function(){
        alert("Payment cancelled");
      }

    });

    handler.openIframe();
  }

  return (

    <button
      onClick={payWithPaystack}
      style={{
        background:"#16a34a",
        color:"white",
        padding:"10px 20px",
        border:"none",
        borderRadius:"6px",
        cursor:"pointer"
      }}
    >
      Pay Now
    </button>

  );

}