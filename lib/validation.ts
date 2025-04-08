import { z } from "zod";


export const createFormValidation = z.object({
    'title': z
        .string()
        .min(2, 'Judul minimal 2 karakter')
        .max(50, 'Judul terlalu panjang'),
    
    'lyrics': z
        .string()
        .min(5, 'Tulis setidaknya 5 kata')
        .max(2000, 'Lirik terlalu panjang, maksimal 1000 karakter'),
    'gender': z
        .string()
        .min(2, 'Plih jenis kelamin')
        .max(400, 'Pilih jenis kelamin'),
    'thumbnail': z
        .string()
})

export const loginFormValidation = z.object({
    'nip' : z.string(),
    'password': z.string()
})

export const userFormValidation = z.object({
    'fullName': z
        .string()
        .min(2, 'Nama terlalu pendek'),
    'email': z
        .string()
        .email()
        .min(5, 'Email terlalu pendek'),
    'nip': z
        .string()
        .min(2, 'NIP terlalu pendek'),
    'password': z
        .string()
        .min(8, 'Password minimal 8 karakter'),
    'photo': z
        .string()
        .optional(),
    'role': z
        .string()
})

export const resetPasswordValidation = z.object({
    newPassword: z
      .string()
      .min(8, "Password minimal 8 karakter"),
    repeatPassword: z
      .string()
      .min(8, "Password minimal 8 karakter"),
  })
  .refine((data: any) => data.newPassword === data.repeatPassword, {
    message: "Password tidak cocok",
    path: ["repeatPassword"], 
  });

export const updateUserValidation = z.object({
    'fullName': z
        .string()
        .min(2, 'Nama terlalu pendek'),
    'nip': z
        .string()
        .min(12, "Masukkan nip yang benar"),
    'email': z
        .string()
        .email()
        .min(5, 'Email terlalu pendek'), 
    'role': z
        .string()
})

export const cloneVoiceValidation = z.object({
    'name': z
        .string()
        .min(2, 'Nama terlalu pendek'),
    'audioClone': z
        .string()
})
