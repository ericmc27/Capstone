import { PaymentElement } from '@stripe/react-stripe-js/checkout';
import { useMainStore } from '../../store/main';
import { useCheckout } from '@stripe/react-stripe-js/checkout';
import { useLoaderData } from 'react-router-dom';

const options = {
  layout: {
    type: 'accordion',
    defaultCollapsed: false,
    radios: 'always',
    spacedAccordionItems: false
  }
}

function CheckoutForm(){
  const cartItems = useMainStore((state) => state.cartItems)
  const removeCartItem = useMainStore((state) => state.removeCartItem)
  const totalCartItems = useMainStore((state) => state.totalCartItems)
  const checkoutState = useCheckout()
  const session = useLoaderData()

  const handlePay = async ()=>{
    console.log('customer paidddddddd')
      const { checkout } = checkoutState
      await checkout.confirm({email: session.email})
  }


  const removeItem = (item)=>{
    removeCartItem(item)
  }

  return (
    <div className='min-h-screen flex'>
      <div className='w-100 border-l border-r border-gray-300 ms-100 shadow-2xl'>
        {
          cartItems.map((item, index) => {
            return <div key={index} className='flex flex-col'>
              <label className='text-xl text-center'>{item.title}</label>

              <div className='flex'>
                <img className='h-35 w-35' src={`${item.images[0]}`} />
                <label className='text-xl'>{item.selling_price}$usd</label>
              </div>
   
              {/* <button onClick={()=>(removeItem(item))}>remove item</button> */}
            </div>
          })
        }
      </div>

      <div className='fixed left-230 top-30'>
        <label className='font-bold text-center'>{totalCartItems.toFixed(2)}</label>
        <PaymentElement options={options} className='w-100' />
        <button className='border p-6 mt-2 bg-green-200' onClick={handlePay}>Pay</button>
      </div>
    </div>
  )
}

export default CheckoutForm