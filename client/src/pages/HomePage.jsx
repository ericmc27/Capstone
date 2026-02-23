import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signIn } from '../../lib/auth-client'
import { handleOnChange } from '../hooks/handleInputChange'
import cart from '/cart_icon.png'

function HomePage(){
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({email: '', password: ''})

  const handleOnSubmit = async (e)=>{
    e.preventDefault()
    const {email, password} = loginData
    const response = await signIn.email({email, password})
    
    if(response){
      navigate('/profile')
    }
  }

  return(
    <div className='h-screen grid grid-rows-[0.6fr_5fr]'>
      <div className='flex items-center justify-center bg-[#353a35] text-[#E0E0E0]'>
        <form className='flex items-center gap-3' onSubmit={handleOnSubmit}>
          <img className='w-15' src={'https://res.cloudinary.com/dzxcqm6ii/image/upload/v1771370469/cart_icon_rl2jq9.png'}/>
          <label>EMAIL</label>
          <input id='email' type='email' className='border h-8 rounded bg-white' value={loginData.email} onChange={(e)=>(handleOnChange(e, setLoginData))}/>
          <label>PASSWORD</label>
          <input id='password' type='password' className='border h-8 rounded bg-white' value={loginData.password} onChange={(e)=>(handleOnChange(e, setLoginData))}/>
          <input type='submit' className='border h-10' value={'login'}/>
        </form>
      </div>
      <div>
      </div>
    </div>
  )
}

export default HomePage