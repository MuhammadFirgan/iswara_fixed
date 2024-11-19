import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'


export default function LogoutButton() {

  const router = useRouter()

  const fetchData = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        router.push('/')
      } 
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Button onClick={() => fetchData()}>
      Logout
    </Button>

  )
}
