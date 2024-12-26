export interface UserProps {
    [x: string]: string

    fullName: string
    email: string
    nip: string
    role: array
    photo?: string
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
    voiceType: string
    prompt: string
    thumbnail?: string
  }

 