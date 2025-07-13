import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";




const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const Pricing = () => {
    const { user } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (selectedAmount) {
      fetch("https://tech-server-blush.vercel.app/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedAmount }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          setShowCheckout(true);
        })
        .catch((err) => {
          console.error("Error fetching client secret", err);
        });
    }
  }, [selectedAmount]);

  return (
    
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center py-12">
      <div className="max-w-4xl text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 mb-10">
          Subscribe and unlock premium features for your projects!
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <PlanCard
            type="1 Month"
            price="9"
            amount={900}
            features={[
              "Basic product uploads",
              "Access to limited analytics",
              "Standard support",
            ]}
            onSubscribe={setSelectedAmount}
          />
          <PlanCard
            type="6 Months"
            price="39"
            amount={3900}
            features={[
              "Unlimited product uploads",
              "Advanced analytics",
              "Priority support",
              "Team collaboration",
            ]}
            onSubscribe={setSelectedAmount}
          />
          <PlanCard
            type="1 Year"
            price="69"
            amount={6900}
            features={[
              "All 6 Month benefits",
              "Featured listing priority",
              "Early feature access",
              "Dedicated account manager",
            ]}
            onSubscribe={setSelectedAmount}
          />
        </div>
      </div>

      {showCheckout && clientSecret && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Complete Your Payment</h3>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
             <CheckoutForm
  onClose={() => setShowCheckout(false)}
  clientSecret={clientSecret}
  userEmail={user?.email}
/>

            </Elements>
          </div>
        </div>
      )}
    </section>
  );
};

const PlanCard = ({ type, price, features, onSubscribe, amount }) => (
  <div className="w-72 bg-white rounded-xl shadow-lg p-6 text-center border border-purple-100 hover:border-purple-300 transition">
    <h3 className="text-2xl font-bold mb-1 text-purple-700">{type}</h3>
    <p className="text-3xl font-bold mb-4">${price}</p>
    <ul className="text-sm text-gray-600 mb-4 space-y-1 text-left pl-4 list-disc">
      {features.map((feature, idx) => (
        <li key={idx}>{feature}</li>
      ))}
    </ul>
    <button
      onClick={() => onSubscribe(amount)}
      className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
    >
      Subscribe
    </button>
  </div>
);

const CheckoutForm = ({ onClose, clientSecret, userEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMsg, setErrorMsg] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);

    const card = elements.getElement(CardElement);

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (error) {
      setErrorMsg(error.message);
      setProcessing(false);
    } else {
      // Step: Verify user after payment success
      try {
        const res = await fetch(`https://tech-server-blush.vercel.app/api/users/verify/${userEmail}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (res.ok) {
          console.log("✅ User verified:", data);
          onClose();
          window.location.href = "/myProfile"; 
        } else {
          setErrorMsg("Verification failed: " + (data.error || ""));
        }
      } catch (err) {
        setErrorMsg("Server error during verification",err);
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="p-2 border rounded-md" />
      {errorMsg && <div className="text-red-500 mt-2">{errorMsg}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};


export default Pricing;
