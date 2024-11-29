import { redirect } from "next/navigation";
import Posts from "./notes/layout";

export default function Home() {
  redirect('/notes');
}
