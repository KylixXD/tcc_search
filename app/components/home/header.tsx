import Link from "next/link";

export function Header(){
    return(
        <header className="bg-gray-900 px-5 py-4">
        <div className="container mx-auto flex justify-between ">
          <h1 className="text-xl font-bold">TCC Search</h1>
          <nav>
            {/* Aqui você pode adicionar os links do menu */}
            <Link href="/auth/login">Login</Link>
          </nav>
        </div>
      </header>
    )
}