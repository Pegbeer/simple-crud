import { redirect } from "next/navigation";
import Posts from "./posts/layout";

export default function Home() {
  redirect('/posts');
}
