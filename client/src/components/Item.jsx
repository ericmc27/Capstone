import { getProductsByCategory } from "../utils/main";
import { useMainStore } from "../../store/main";

export const Item = ({ category }) => {
  const setCurrentProducts = useMainStore((state)=>state.setCurrentProducts)

  async function handleOnClick(category) {
    const products = await getProductsByCategory(category);
    setCurrentProducts(products)
  }

  return (
    <li className="hover:cursor-pointer" onClick={() => handleOnClick(category)}>{category}</li>
  )
}