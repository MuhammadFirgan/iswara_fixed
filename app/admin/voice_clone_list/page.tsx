
import DeleteClone from "@/components/shared/DeleteClone"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getCloneAudio } from "@/lib/actions/cloneAudio.action"

export default async function CloneVoice() {

    const clones = await getCloneAudio()
 

  return (
    <section className="px-10">
      <h1 className="text-2xl mb-8">Daftar Suara Tiruan</h1>
      <Table>
          <TableCaption>List Suara Tiruan</TableCaption>
          <TableHeader>
              <TableRow>
              <TableHead>Voice Id</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead className="text-right">Action</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {clones?.map((clone: any) => (
              
              <TableRow key={clone?._id}>
                <TableCell>{clone?._id}</TableCell>
                <TableCell className="line-clamp-1">{clone?.name}</TableCell>
                <TableCell className="text-right">
                  <DeleteClone voiceId={clone?._id} voiceUrl={clone?.fileUrl} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>

    </section>
  )
}
