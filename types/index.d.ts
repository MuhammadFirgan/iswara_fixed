import { Dispatch, SetStateAction } from "react"

// export interface UserProps {
//     [x: string]: string
//     fullName: string
//     email: string
//     role: array
//     photo?: string
// }

// export interface updateUserProps extends UserProps {
//   nip: string
// }

// export interface createUserProps {
//     fullName: string
//     email: string
//     nip: string
//     role: string
//     photo?: string
//     password: string
// }
  
//   export interface CardProps {
//       image: string
//       title: string
//       profile: string
//       name: string
//       slug: string
//       nip: string
//   }

//   export type loginProps = {
//     nip: string
//     password: string
//   }

//   export type UploadFileProps = {
//     id: string,
//     url: string
//   }

//   export type audioProps = {
//     userid: string
//     audio: {
//       title: string
//       slug: string
//       url: string
//       author: {
//         fullName: string
//       }
//       lyrics: string
//       gender: string
//       duration: string
//       thumbnail?: string
//     }
//   }


//   export interface paramsForAudio {
//     audio: {
//       title: string
//       description: string
//       gender: string
//       thumbnail: string
//     }
//     audioSlug?: string
//   }


//   export interface audioContextType {
//     audio: AudioProps | undefined;
//     setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
//   }

//   export type UrlQueryParams = {
//     params: string
//     key: string
//     value: string | null
//   }
  
//   export type RemoveUrlQueryParams = {
//     params: string
//     keysToRemove: string[]
//   }

//   // export type SearchParamProps = {
//   //   params?: Record<string, string>;
//   //   searchParams?: Record<string, string | string[] | undefined>;
//   // };

//   export type Model = {
//     name: string;
//     label: string;
//     language: string;
//     domain: string;
//     voice: string;
//     gender: string;
//     channels: number;
//     samplerate: number;
//   };
// Menggunakan AudioProps sebagai basis karena sering digunakan
export interface AudioProps {
  _id: string;
  title: string;
  slug: string;
  url: string;
  thumbnail?: string;
  lyrics: string;
  gender: string;
  duration: string;
  author: {
    fullName: string;
    photo?: string;
    nip: string;
  };
}

export interface IRole {
    _id: string;
    name: string;
}

export interface UserProps {
    _id?: string;
    fullName: string;
    email: string;
    role: IRole; // Mengganti 'array' karena bukan tipe valid TS
    photo?: string;
    nip: string;
}

export interface updateUserProps extends UserProps {
  nip: string;
}



export interface createUserProps {
    fullName: string;
    email: string;
    nip: string;
    role: string;
    photo?: string;
    password: string;
}
  
export interface CardProps {
    image: string;
    title: string;
    profile: string;
    name: string;
    slug: string;
    nip: string;
}

export type loginProps = {
  nip: string;
  password: string;
};

export type audioProps = {
  userid: string;
  audio: {
    title: string;
    slug: string;
    url: string;
    author: {
      fullName: string;
    };
    lyrics: string;
    gender: string;
    duration: string;
    thumbnail?: string;
  };
};

export interface paramsForAudio {
  audio: {
    title: string;
    description: string;
    gender: string;
    thumbnail: string;
  };
  audioSlug?: string;
}

export interface audioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type Model = {
  name: string;
  label: string;
  language: string;
  domain: string;
  voice: string;
  gender: string;
  channels: number;
  samplerate: number;
};
  export type barProps = {
    name: string
    total?: string
    image: string
    role: string
    token: object | string
    type?: 'first' | 'second'
  }
export interface UploadFileProps {
  id: string;
  url: string;
}