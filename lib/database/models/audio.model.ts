import { Document, Schema, model, models } from "mongoose";



// export interface IAudio extends Document {
//     _id: string
//     title: string,
//     description: string
//     voicePrompt: string
//     cloneAudio: string
//     thumbnail: string
//     author: string
//     duration: string
// }

// const AudioSchema = new Schema({
//     _creationTime: { type: Number },
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     cloneAudio: { type: Schema.Types.ObjectId, ref: 'CloneAudio', },
//     voicePrompt: { type: String, required: true },
//     thumbnail: { type: String, required: true },
//     duration: { type: String, required: true },
//     author: { type: Schema.Types.ObjectId, ref: "User" }

// })
export interface IAudio extends Document {
    _id: string
    title: string
    task_id: string
    slug: string
    lyrics: string
    gender: string
    thumbnail: string
    author: string
    duration: string
}

const AudioSchema = new Schema({
    _creationTime: { type: Number, default: Date.now },
    task_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    lyrics: { type: String, required: true },
    gender: { type: String, required: true },
    audio: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" }

})



const Audio = models.Audio || model('Audio', AudioSchema)

export default Audio