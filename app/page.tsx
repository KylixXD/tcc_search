import Image from "next/image";
import styles from "./page.module.css";
import './globals.css'
import Link from "next/link";
import LoginForm from "./components/loginForm";


export default function Home() {
  return (
      <main>
        <div className="h-screen flex justify-center items-center bg-blue-400 px-5">
            <LoginForm />
        </div>
      </main>
  );
}
