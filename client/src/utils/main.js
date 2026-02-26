import { redirect } from "react-router-dom";

export async function checkAuthentication() {
  const session = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/api/check-user-session`,
    { credentials: "include" },
  );

  if(session.status === 401){
    throw redirect("/")
  }

  return await session.json();
}
