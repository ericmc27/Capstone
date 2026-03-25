import { useLoaderData } from "react-router-dom"

function AdminPage() {
  const orders = useLoaderData()
  console.log(orders)

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border h-150 w-220">
        <label>Orders</label>
        {
          orders.map((order, index) => {
            return <div className="flex border" key={index}>
              <img className="h-14 w-14" src={order.image} />
              {order.title}
              status:  {order.paymentStatus}
            </div>
          })
        }
      </div>
    </div>
  )
}

export default AdminPage