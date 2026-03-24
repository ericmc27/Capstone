import { useMainStore } from "../../store/main"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

function ConfirmationPage(){
  const [params] = useSearchParams()
  const session_id = params.get('session_id')
  const clearCartItems = useMainStore((state) => state.clearCartItems)
  const navigate = useNavigate()



  useEffect(()=>{
    clearCartItems()

    const checkPayment = async ()=>{
      await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/storePayment/${session_id}`, {method: 'POST', credentials: 'include'})
    }

    checkPayment()
  }, [])

  return(
    <div>
      your payment was proccessed successfully
      <button className="border" onClick={()=>navigate('/profile')}>navigate to home</button>
    </div>
  )
}

export default ConfirmationPage