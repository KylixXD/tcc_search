import Image from "next/image";
import styles from "./page.module.css";
import './globals.css'
import { SearchBar } from "./components/TCC/SearchBar";




export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="w-1/2 mx-auto">
        <SearchBar shouldRedirect={true}/>      
      </div>
    </main>
  );
}
