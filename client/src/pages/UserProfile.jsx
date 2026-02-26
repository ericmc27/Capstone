import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "../../lib/auth-client";
import Img from '../components/ClouldImage'

function UserProfile() {
  const data = useLoaderData();
  const [ulIsActive, setUlIsActive] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/");
        },
      },
    });
  };

  return (
    <div className="h-screen flex flex-col bg-[#f8f9fa]">
      {data.session ? (
        <>
          <div className="flex items-center bg-[#264653]  text-white">
            <div className="relative">
              <button className="hover:cursor-pointer ms-7" onClick={()=>(setUlIsActive(!ulIsActive))}>Current category</button>
              {ulIsActive ? (
                <ul className="absolute bg-[#ffffff] w-60  text-black top-8 border">
                  <li>Bottomwear</li>
                  <li>Clothing Accessories</li>
                  <li>Winter Wear</li>
                  <li>Raincoats</li>
                  <li>Topwear</li>
                  <li>Innerwear and Swimwear</li>
                  <li>Kurtas, Ethnic Sets and Bottoms</li>
                  <li>Blazers, Waistcoats and Suits</li>
                </ul>
              ) : null}
            </div>

            <button
              className="h-10 w-20 hover:cursor-pointer ms-auto me-5"
              onClick={handleSignOut}
            >
              Log out
            </button>
          </div>

          <div className="flex justify-center items-center gap-25 flex-1 bg-[#fafffb]">
            <div className="h-120 w-50 border rounded shadow-2xl shadow-amber-700">
              <Img publicId={'green_tshirt_jkgjq6'} className={'object-cover h-full w-full'}/>
            </div>

             <div className="h-120 w-50 border rounded shadow-2xl shadow-cyan-500">
              <Img publicId={'brown_tshirt_be6zcb'} className={'object-cover h-full w-full'}/>
            </div>

             <div className="h-120 w-50 border rounded shadow-2xl shadow-green-200">
              <Img publicId={'black_tshirt_oj47ak'} className={'object-cover h-full w-full'}/>
            </div>
          </div>
        </>
      ) : (
        <div>Noooo</div>
      )}
    </div>
  );
}

export default UserProfile;
