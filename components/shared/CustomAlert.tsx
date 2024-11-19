import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
export default function CustomAlert({ message } : { message: string }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Login Error</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>

  )
}
