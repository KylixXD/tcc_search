import { NextRequest } from "next/server"

export async function POST(request: NextRequest) { 
    let body = await request.json()
    console.log(body)
   
    return new Response('Hello, Next.js!', {
        status: 200,
      })
}

