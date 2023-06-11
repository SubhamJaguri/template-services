import { useGetManyBaseUserControllerUser } from "@root/backend/backendComponents"

export default function Home() {
  const {data: users} = useGetManyBaseUserControllerUser({})
  if(!users) return (<p>Loading...</p>)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hello</p>
      <pre>{JSON.stringify(users)}</pre>
    </main>
  )
}
