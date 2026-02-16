import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signIn } from '../../lib/auth-client'
import cart from '/cart_icon.png'

function HomePage(){
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({email: '', password: ''})

  const handleOnChange = (e)=>{
    const {id, value} = e.target
    setLoginData(prev=>({...prev, [id]:value}))
  }

  const handleOnSubmit = async (e)=>{
    e.preventDefault()
    const {email, password} = loginData
    const response = await signIn.email({email, password})
    
    if(response){
      navigate('/profile')
    }
  }

  return(
    <div className='h-screen grid grid-rows-[0.6fr_5fr] bg-blue-100'>
      <div className='flex items-center justify-center'>
        <form className='flex items-center gap-3' onSubmit={handleOnSubmit}>
          <img className='h-10 w-10' src={cart}/>
          <label>EMAIL</label>
          <input id='email' type='email' className='border h-8 rounded' value={loginData.email} onChange={handleOnChange}/>
          <label>PASSWORD</label>
          <input id='password' type='password' className='border h-8 rounded' value={loginData.password} onChange={handleOnChange}/>
          <input type='submit' className='border p-2' value={'login'}/>
        </form>
      </div>
      <div>
      </div>
    </div>
  )
}

export default HomePage