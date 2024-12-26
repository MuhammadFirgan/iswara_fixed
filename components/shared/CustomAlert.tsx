import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
export default function CustomAlert({ message, status } : { message: string, status: number }) {
  return (
    <Alert className={status !== 200 ? 'bg-red-700' : 'bg-green-700'}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{status !== 200 ? 'Error' : 'Success'}</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>

  )
}
