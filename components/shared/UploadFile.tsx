"use client";

import { getToken } from "@/constans/getToken";
import { uploadImageUser } from "@/lib/actions/user.action";
import { UploadButton } from "@/lib/uploadthing";



export default function UploadFile() {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <h4 className="text-xl font-semibold text-white mb-2 block">Ubah Foto Profile</h4>
        <p className="text-gray-400 mb-4 block">Upload yang diijinkan (JPG, PNG, JPEG)</p>
      </div>
      <UploadButton
        endpoint="imageUploader"

        className="flex justify-start w-full ut-button:bg-gradient-to-br ut-button:from-emerald-900/30 ut-button:to-cyan-900/30"
        onClientUploadComplete={ async (res) => {
          try {
            const token = await getToken()
            const userId = token?.id
            await uploadImageUser({id: userId, url: res[0].ufsUrl})
            
          } catch(error) {
            console.error(error)
          }

        }}
        onUploadError={(error: Error) => {
          
          alert(`ERROR! ${error.message}`);
        }}
      />

    </div>
   
  );
}
