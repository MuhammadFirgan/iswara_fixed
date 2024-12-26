export interface UserProps {
    fullName: string
    email: string
    username: string
    role: string
    photo?: string
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
    voiceType: string
    prompt: string
    thumbnail?: string
  }

 