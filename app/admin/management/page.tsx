
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
import { getToken } from "@/constans/getToken"
import { getAllUser, getUserById } from "@/lib/actions/user.action"
import { dbConnect } from "@/lib/database"
import User from "@/lib/database/models/user.model"
import { updateUserProps } from "@/types"
import Image from "next/image"




export default async function page() {

  const tokenData = await getToken()
    
   
  const userId = tokenData?.id
  const role = tokenData?.role

  let name = ""
  let photo = ""
  let nip = ""

 

  try {

    const userData = await getUserById(userId)


    name = userData?.fullName
    photo = userData?.photo
    nip = userData?.nip
  
   
  } catch (error) {
    console.error(error)
  }

  const result = await getAllUser({ page: 1, limit: 10 })

  


  return (

    <div className="space-y-6 px-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome, {name}</h1>
          <p className="text-gray-400">{role === "admin" ? "Operator" : "Guru"} | {nip}</p>
        </div>
        
      </div>
      

      {/* Table */}
      <div className="glass-effect rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800/50 border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">User</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Role</th>
                
                <th className="text-right py-4 px-6 text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {result.users.map((user: updateUserProps, index: number) => (
                <tr
                  key={user?._id}
                  className="border-b border-gray-800/50 hover:bg-white/5 transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <Image
                        width={10}
                        height={10}
                        src={user?.photo || '/profile.jpg'}
                        alt={user?.fullName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                      />
                      <div>
                        <p className="text-white font-medium">{user?.fullName}</p>
                        <p className="text-gray-400 text-sm">{user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {/* {getRoleIcon(user.role)} */}
                      <span className="text-gray-300">{ user?.role.name === "admin" ? 'Operator' : 'Guru' }</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end space-x-2">
                      {/* {getRoleIcon(user.role)} */}
                      <EditModal user={user} />
                      <Badge variant="destructive">Hapus</Badge>
                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-gray-400 hidden md:block">Showing {result.users.length} users</p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-dark-700 transition-colors duration-200">
            Previous
          </button>
          <button className="px-4 py-2 bg-electric-500 text-white rounded-lg hover:bg-electric-600 transition-colors duration-200">
            1
          </button>
          <button className="px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-dark-700 transition-colors duration-200">
            2
          </button>
          <button className="px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-dark-700 transition-colors duration-200">
            Next
          </button>
        </div>
      </div>
    </div>
    
    
    // <section className="px-10">
    //   <h1 className="text-2xl mb-8">Daftar User Terdaftar</h1>
    //   <Table>
    //       <TableCaption>List User</TableCaption>
    //       <TableHeader>
    //           <TableRow>
    //           <TableHead>Nama</TableHead>
    //           <TableHead>NIP</TableHead>
    //           <TableHead>Status</TableHead>
    //           <TableHead className="text-right">Action</TableHead>
    //           </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {users?.map((user: updateUserProps) => (

    //           <TableRow key={user?._id}>
    //             <TableCell className="line-clamp-1">{user?.fullName}</TableCell>
    //             <TableCell >{user?.nip}</TableCell>
    //             <TableCell>{ user?.role.name === "admin" ? 'Operator' : 'Guru' }</TableCell>
    //             <TableCell className="flex gap-2 justify-end">
    //               <EditModal user={user} />
    //               <Badge variant="destructive">Hapus</Badge>
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //   </Table>

    // </section>
  )
}
