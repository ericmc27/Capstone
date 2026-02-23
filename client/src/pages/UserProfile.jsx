import { useLoaderData, useNavigate} from 'react-router-dom'
import { signOut } from '../../lib/auth-client'

function UserProfile(){
  const session = useLoaderData()
  const navigate = useNavigate()
  
  const handleSignOut = ()=>{
    signOut({
      fetchOptions: {
        onSuccess: ()=>{
          navigate('/')
        }
      }
    })
  }
  
  return(
    <div>
      {
        session ?
        <div className='flex justify-end'>
          {session.userData.name}
          <button className='border bg-red-500 mt-5 me-10 h-10 w-20' onClick={handleSignOut}>Log out</button>
        </div>
        :
        <div>Noooo</div>
      }
    </div>
  )
}

export default UserProfile