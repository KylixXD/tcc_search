import Image from "next/image";
import styles from "./page.module.css";
import './globals.css'
import Link from "next/link";


export default function Home() {
  return (
      <main>
        <div className="bg-green-300">
          <h1>TCC Search</h1>
          <input type="text"></input>
          <Link href="/create">Adicionar TCC</Link>
        </div>
      </main>
  );
}
