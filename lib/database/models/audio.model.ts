import { Document, Schema, model, models } from "mongoose";



export interface IAudio extends Document {
    _id: string
    title: string,
    description: string
    imagePrompt: string
    voicePrompt: string
    voiceType: string
    thumbnail: string
    audio: string
    author: string
}

const AudioSchema = new Schema({
    _creationTime: { type: Number },
    title: { type: String, required: true },
    description: { type: String, required: true },
    voiceType: { type: String, required: true },
    voicePrompt: { type: String, required: true },
    imagePrompt: { type: String, required: true },
    thumbnail: { type: String, required: true },
    audio: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" }
})

const Audio = models.Audio || model('Audio', AudioSchema)

export default Audio