import { CheckoutProvider } from "@stripe/react-stripe-js/checkout"
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from '../components/CheckoutForm'
import { useMemo } from "react";
import { useMainStore } from "../../store/main";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY)

function CheckoutPage() {
  const cartItems = useMainStore((state) => state.cartItems)
  const clientSecret = useMemo(() => {
    if (cartItems.length === 0) return

    return fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/create-checkout-session`, {
      method: 'POST', credentials: 'include', body: JSON.stringify(cartItems), headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [cartItems]);

  return (
    <>
      {
        cartItems.length !== 0 ?
        <CheckoutProvider stripe={stripePromise} options={{ clientSecret, elementsOptions: { appearance: { theme: 'night', inputs: 'spaced' } } }}>
          <CheckoutForm />
        </CheckoutProvider> :
        <div>Hi</div>
      }
    </>
  )
}

export default CheckoutPage