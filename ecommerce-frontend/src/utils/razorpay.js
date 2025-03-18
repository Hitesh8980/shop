import { createOrder } from "./api";

export const handlePayment = async (amount, user, onSuccess) => {
  try {
    if (!window.Razorpay) {
      throw new Error("Razorpay SDK not loaded. Please check the script in index.html.");
    }

    const orderData = await createOrder(amount);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, 
      amount: orderData.amount,
      currency: "INR",
      name: "E-Commerce Store",
      description: "Purchase Products",
      order_id: orderData.id,
      handler: async (response) => {
        console.log("Payment Successful:", response);
        onSuccess(response);
      },
      prefill: {
        name: user?.name || "Guest User",
        email: user?.email || "guest@example.com",
        contact: user?.phone || "9999999999",
      },
      theme: {
        color: "#FF6F61",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment Error:", error);
    alert(error.message); 
  }
};
