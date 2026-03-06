import { redirect } from "react-router-dom";

export async function checkAuthentication() {
  const session = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/api/check-user-session`,
    { credentials: "include" },
  );

  if (session.status === 401) {
    throw redirect("/");
  }

  return await session.json();
}

export async function getProductsByCategory(category) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/api/products/category/${category}`,
    { credentials: "include" },
  );
  const data = await response.json();
  return data.products;
}
