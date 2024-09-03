import { getServerSession } from "next-auth"

export default async function Page(){
    const session = await getServerSession()
    return(
        <div>
            <div>
                Olá, 
            </div>
            <h1>Teste</h1>
        </div>
    )
}