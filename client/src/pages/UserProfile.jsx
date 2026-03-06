import { useLoaderData, useNavigate } from "react-router-dom";
import { useMainStore } from "../../store/main"
import { Item } from "../components/Item"
import { signOut } from "../../lib/auth-client";
import Img from "../components/ClouldImage";

function UserProfile() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const currentProducts = useMainStore((state)=>state.currentProducts)
  console.log(currentProducts)

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
    // bg-[#f8f9fa]
    <div className="h-screen flex flex-col  bg-[#edebe6]">
      {data.session ? (
        <>
          <div className="flex items-center bg-[#264653] text-white">
            <ul className="flex gap-4 m-[0_auto] font-[Gveret_Levin]">
              <Item category={'Bottomwear'} />
              <Item category={'Clothing Accessories'} />
              <Item category={'Winter Wear'} />
              <Item category={'Raincoats'} />
              <Item category={'Topwear'} />
              <Item category={'Innerwear and Swimwear'} />
              <Item category={'Kurtas, Ethnic Sets and Bottoms'} />
              <Item category={'Blazers, Waistcoats and Suits'} />
            </ul>

            <button
              className="h-10 w-20 hover:cursor-pointer"
              onClick={handleSignOut}
            >
              Log out
            </button>
          </div>

          <div className="flex flex-col justify-center items-center relative flex-1">
            {/* min-h-0 overflow-y-auto */}
            {/* <h1>Closer than you ever imagined</h1>
            <Img publicId={'tennis_court'} className={'absolute inset-0 w-full h-full object-cover'}/> */}

            {!currentProducts ?
              <div className="flex gap-25">
                <div className="h-120 w-50 border rounded shadow-2xl">
                  <Img
                    publicId={"green_tshirt_jkgjq6"}
                    className={"object-cover h-full w-full"}
                  />
                </div>

                <div className="h-120 w-50 border rounded shadow-2xl">
                  <Img
                    publicId={"brown_tshirt_be6zcb"}
                    className={"object-cover h-full w-full"}
                  />
                </div>

                <div className="h-120 w-50 border rounded shadow-2xl">
                  <Img
                    publicId={"black_tshirt_oj47ak"}
                    className={"object-cover h-full w-full"}
                  />
                </div>
              </div> :

              <div className="flex gap-5 w-full">
                {
                  currentProducts.map((product, index)=>{
                    return <div className=" h-120 w-200 mt-2" key={index}>
                      {product['sub_category']}
                      <img src={`${product.images[0]}`} className="h-120 w-200 rounded shadow-2xl"/>
                      </div>
                  })
                }
              </div>
            }
          </div>
        </>
      ) : (
        <div>Noooo</div>
      )}
    </div>
  );
}

export default UserProfile;
