import { redirect } from "next/navigation";

export default function Logout() {
  redirect("/auth/signin");
}
