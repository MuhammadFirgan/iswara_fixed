import { Dispatch, SetStateAction } from "react"

export interface UserProps {
    [x: string]: string
    fullName: string
    email: string
    role: array
    photo?: string
}

export interface updateUserProps extends UserProps {
  nip: string
}

export interface createUserProps {
    fullName: string
    email: string
    nip: string
    role: string
    photo?: string
    password: string
}
  
  export interface CardProps {
      image: string
      title: string
      profile: string
      name: string
      slug: string
      nip: string
  }

  export type loginProps = {
    nip: string
    password: string
  }

  export type UploadFileProps = {
    id: string,
    url: string
  }

  export type audioProps = {
    userid: string
    audio: {
      title: string
      slug: string
      audio: string
      author: {
        fullName: string
      }
      lyrics: string
      gender: string
      duration: string
      thumbnail?: string
    }
  }


  export interface paramsForAudio {
    userid: string;
    audio: {
      title: string
      lyrics: string
      gender: string
      thumbnail: string
    }
    audioSlug?: string
  }


  export interface audioContextType {
    audio: AudioProps | undefined;
    setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
  }

  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }

  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
 