import { useLoaderData, useNavigate } from "react-router-dom";
import { useMainStore } from "../../store/main"
import { signOut } from "../../lib/auth-client";
import Item from "../components/Item";
import Img from "../components/ClouldImage";

function UserProfilePage() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const currentProducts = useMainStore((state) => state.currentProducts)
  const cartItemsLength = useMainStore((state) => state.cartItems.length)
  const cartItems = useMainStore((state) => state.cartItems)
  const updateCartItems = useMainStore((state) => state.updateCartItems)

  const handleOnClick = () => {
    navigate('/checkout')
  }

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
              <Item category={'Blazers, Waistcoats and Suits'} />
            </ul>

            <button
className="h-10 w-20 hover:cursor-pointer"
onClick={handleSignOut}
>
Log out
</button>

            <button onClick={handleOnClick}>
              <Img imagePublicId={'download_kv9uso'} className={'h-7 w-7'} />
              {cartItemsLength}
            </button>
          </div>

          <div className="flex flex-col justify-center items-center relative flex-1">
            {!currentProducts ?
              <div className="flex gap-25">
                <div className="h-120 w-50 border rounded shadow-2xl">
                  <Img
                    imagePublicId={"download_xanars"}
                    className={"object-cover h-full w-full"}
                  />
                </div>

                <div className="h-120 w-50 border rounded shadow-2xl">
                  <Img
                    imagePublicId={"images_ur7cbe"}
                    className={"object-cover h-full w-full"}
                  />
                </div>

                <div className="h-120 w-50 border rounded shadow-2xl">
                  <Img
                    imagePublicId={"download_gs83vz"}
                    className={"object-cover h-full w-full"}
                  />
                </div>
              </div> :

              <div className="flex gap-5 w-full">
                {
                  currentProducts.map((product, index) => {
                    return <div className=" h-120 w-200 mt-2" key={index}>
                      <button onClick={() => (updateCartItems(product))} className="border">Add to cart</button>
                      <img src={`${product.images[0]}`} className="h-120 w-200 rounded shadow-2xl" />
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

export default UserProfilePage;
