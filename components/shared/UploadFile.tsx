"use client";

import { getToken } from "@/constans/getToken";
import { uploadImageUser } from "@/lib/actions/user.action";
import { UploadButton } from "@/lib/uploadthing";



export default function UploadFile() {
  return (
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={ async (res) => {
          try {
            const token = await getToken()
            const userId = token?.id
            const newImage = await uploadImageUser({id: userId, url: res[0].url})

          } catch(error) {
            console.log(error)
          }

        }}
        onUploadError={(error: Error) => {
          
          alert(`ERROR! ${error.message}`);
        }}
      />
   
  );
}
