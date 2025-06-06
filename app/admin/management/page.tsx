
import EditModal from "@/components/shared/EditModal"
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
import { updateUserProps } from "@/types"




export default async function page() {

  const users = await getAllUser()


  return (
    
    <section className="px-10">
      <h1 className="text-2xl mb-8">Daftar User Terdaftar</h1>
      <Table>
          <TableCaption>List User</TableCaption>
          <TableHeader>
              <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>NIP</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: updateUserProps) => (

              <TableRow key={user?._id}>
                <TableCell className="line-clamp-1">{user?.fullName}</TableCell>
                <TableCell >{user?.nip}</TableCell>
                <TableCell>{ user?.role.name === "admin" ? 'Operator' : 'Guru' }</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <EditModal user={user} />
                  <Badge variant="destructive">Hapus</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>

    </section>
  )
}
