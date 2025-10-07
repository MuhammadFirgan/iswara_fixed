import AudioForm from "@/components/shared/AudioForm";
import { getToken } from "@/constans/getToken";


export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

    const token = await getToken()
    const userid = token?.id as string
    

  return (
    <section className="px-10 pb-10 sm:max-w-3xl mt-32">
        <h1 className="text-xl mb-10">Ubah Audio Anda</h1>
        
        <AudioForm userid={userid as string} type="update" audioSlug={slug}/>
    </section>
  )
}
