import Image from "next/image";
import styles from "./page.module.css";
import './globals.css'
import LoginForm from "./components/auth/loginForm";
import { SearchBar } from "./components/TCC/SearchBar";
import TccList from "./components/TCC/TCCList";



export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
        <SearchBar/>
  </main>
  );
}
