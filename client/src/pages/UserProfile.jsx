import { useLoaderData } from 'react-router-dom'

function UserProfile(){
  const session = useLoaderData()
  
  return(
    <div>
      {
        session ?
        <div>Welcome to protected route</div>
        :
        <div>Noooo</div>
      }
    </div>
  )
}

export default UserProfile