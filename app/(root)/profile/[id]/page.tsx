
import { 
  User, 
  Mail, 
  MapPin, 
  Lock, 
  Eye, 
  EyeOff, 
  Save, 
  Shield, 
  Bell, 
  Globe, 
  Smartphone,
  Camera,
  Edit3,
  Check,
  X,
  AlertCircle,
  Settings as SettingsIcon
} from 'lucide-react';

import ProfileSection from '@/components/shared/ProfileSection';
import NotFound from '@/app/not-found';
import { getUserById } from '@/lib/actions/user.action';
import { getAudioByAuthor } from '@/lib/actions/audio.action';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const user = await getUserById(id)

    if(!user) {
        return <NotFound title="User Tidak Ditemukan"/>
    }

    // const userNip = user.nip

    // const audios = await getAudioByAuthor(userNip)



  return (
    <div className="space-y-8 sm:px-8 sm: py-6">
      {/* Header */}
      <div className='px-5'>
        <h1 className="text-4xl font-bold gradient-text mb-3">Profile Settings</h1>
        <p className="text-gray-400 text-lg">Manage your account settings and preferences</p>
      </div>

      <ProfileSection user={user}/>
    </div>
  );
};

export default page;




// import NotFound from "@/app/not-found";
// import ProfileSection from "@/components/shared/ProfileSection";
// import UploadFile from "@/components/shared/UploadFile";
// import { getAudioByAuthor } from "@/lib/actions/audio.action";
// import { getUserById }  from "@/lib/actions/user.action";
// import Image from "next/image";

// export default async function Page({ params }: { params: Promise<{ id: string }> }) {

//     const { id } = await params

//     const user = await getUserById(id)

//     if(!user) {
//         return <NotFound title="User Tidak Ditemukan"/>
//     }

//     const userNip = user.nip

//     const audios = await getAudioByAuthor(userNip)

//     return (
//         <section className="px-10 mt-28">
//             <div className="flex flex-col gap-10 sm:flex-row">
//                 <div className="flex flex-col gap-3">                    
//                     <Image key={user?.photo} src={user.photo || '/profile.jpg'} width={200} height={200} alt="profile" className="w-96 h-96 aspect-square sm:w-60 sm:h-60"  />
//                     <UploadFile />
//                 </div>
//                 <div className="flex flex-col gap-9">
//                     <div className="flex flex-col gap-7">
//                         <div>
//                             <h1 className="text-base text-zinc-500">Nama</h1>
//                             <span className="text-xl">{user?.fullName}</span>
//                         </div>
//                         <div>
//                             <h1 className="text-base text-zinc-500">Nip</h1>
//                             <span className="text-xl">{user?.nip}</span>
//                         </div>
//                         <div>
//                             <h1 className="text-base text-zinc-500">Email</h1>
//                             <span className="text-xl">{user?.email}</span>
//                         </div>
//                     </div>
//                     <ProfileSection audios={audios}/>
//                 </div>
                
//             </div>
//         </section>
//     )
// }