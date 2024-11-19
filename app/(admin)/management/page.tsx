import CreateUserForm from "@/components/shared/CreateUser"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getAllUser } from "@/lib/actions/user.action"


export default async function page() {

  const users = await getAllUser()


  return (
    <section className="px-10">
      <CreateUserForm />
      <Table>
          <TableCaption>List User</TableCaption>
          <TableHeader>
              <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (

              <TableRow key={user._id}>
                <TableCell className="line-clamp-1">{user.fullName}</TableCell>
                <TableCell>{ user.role.name === "admin" ? 'Operator' : 'Guru' }</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Badge variant="destructive">Hapus</Badge>
                  <Badge variant="warning">Ubah</Badge>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>

    </section>
  )
}
