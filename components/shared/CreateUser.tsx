import { getRole } from "@/lib/actions/role.action"
import AddUserForm from "./AddUserForm"


export default async function CreateUserForm() {

    const roles = await getRole()
    
  return (
    <AddUserForm roles={roles?.data} />
  )
}
