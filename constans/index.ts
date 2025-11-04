
export const voiceTypes = [
    {
        id: 1,
        voice: "alloy",
        as: "Laki-laki (25-30 tahun)"
    },
    {
        id: 2,
        voice: "echo",
        as: "Laki-laki (30-35 tahun)"
    },
    {
        id: 3,
        voice: "fable",
        as: "Laki-laki (28-33 tahun)"
    },
    {
        id: 4,
        voice: "onyx",
        as: "Laki-laki (40 tahun)"
    },
    {
        id: 5,
        voice: "Nova",
        as: "perempuan (27-32 tahun)"
    },
    {
        id: 6,
        voice: "shimmer",
        as: "perempuan (22-26 tahun)"
    },
]

export const tentativeVoices = [
    {
        id: 1,
        voice: "Bethari",
        as: "Perempuan"
    },
    {
        id: 2,
        voice: "Bayu",
        as: "Laki-laki"
    }
]

export const userId = process.env.PLAYHT_USER_ID
export const secretKey = process.env.PLAYHT_SECRET_KEY
export const newSecretKey = process.env.SUNOAI_SECRET_KEY
export const prosaApiKey = process.env.PROSA_API_KEY
export const prosaUrl = process.env.PROSA_URL