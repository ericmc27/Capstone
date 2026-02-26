import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signIn } from '../../lib/auth-client'
import { handleOnChange } from '../hooks/handleInputChange'
import Img from '../components/ClouldImage'

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
    <div className='h-screen grid grid-rows-[0.6fr_5fr] bg-[#F3F4F6]'>
      <div className='flex items-center justify-center bg-[#6482a6] text-[#E0E0E0]'>
        <form className='flex items-center gap-3' onSubmit={handleOnSubmit}>
          <Img className={'w-10 h-10'} publicId={'shopping-cart_avme0r'}/>
          <label>EMAIL</label>
          <input id='email' type='email' className='border h-8 rounded bg-white text-black' value={loginData.email} onChange={(e)=>(handleOnChange(e, setLoginData))}/>
          <label>PASSWORD</label>
          <input id='password' type='password' className='border h-8 rounded bg-white text-black' value={loginData.password} onChange={(e)=>(handleOnChange(e, setLoginData))}/>
          <input type='submit' className='border rounded p-1.5 bg-amber-100 text-black' value={'login'}/>
        </form>
      </div>

      <div className='font-[Playwrite_AT] text-4xl'>
        Click. Shop. Enjoy. 
      </div>
    </div>
  )
}

export default HomePage