import { z } from "zod";

export const customFormValidation = z.object({
    'title': z
        .string()
        .min(2, 'Judul minimal 2 karakter')
        .max(50, 'Judul terlalu panjang'),
    'description': z
        .string()
        .min(2, 'Deskripsi minimal 2 karakter')
        .max(400, 'Deskripsi terlalu panjang')
        .optional(),
    'voiceType': z
        .string()
        .min(2, 'Pilih setidaknya 1 jenis suara'),
    'prompt': z
        .string()
        .min(5, 'Tulis setidaknya 5 kata'),
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
