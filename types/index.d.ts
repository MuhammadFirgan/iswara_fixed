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
    title: string
    description?: string
    cloneAudio: string
    voicePrompt: string
    thumbnail?: string
  }

  export interface generateAudioProps {
    voice: string
    prompt: string
  }

 