import { useState } from "react"
import { signUp } from "../../lib/auth-client"
import { handleOnChange } from "../hooks/handleInputChange"

function SignupPage() {
  const [signupData, setSignupData] = useState({ name: '', email: '', passwrod: '' })

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = signupData
    const response = await signUp.email({ email, password, name })
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img className="w-25" src="/sign-up.png" />
      <form className='flex flex-col items-center justify-center border h-80 w-75' onSubmit={handleOnSubmit}>
        <label>Name</label>
        <input id="name" className="border w-50" type="text" onChange={(e) => (handleOnChange(e, setSignupData))} />
        <label>Email</label>
        <input id="email" className="border w-50" type="email" onChange={(e) => (handleOnChange(e, setSignupData))} />
        <label>Password</label>
        <input id="password" className="border w-50" type="password" onChange={(e) => (handleOnChange(e, setSignupData))} />
        <input className="border mt-10 p-5" type="submit" value={'signup'} />
      </form>
    </div>
  )
}

export default SignupPage