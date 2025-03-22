import AudioForm from "@/components/shared/AudioForm";
import { getToken } from "@/constans/getToken";


export default async function page() {

    const token = await getToken()
    const userid = token?.id as string
    

  return (
    <section className="px-10 pb-10 sm:max-w-3xl mt-32">
        <h1 className="text-xl mb-10">Buat Audio Anda</h1>
        
        <AudioForm userid={userid as string}/>
    </section>
  )
}
