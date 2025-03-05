import { Document, Schema, model, models } from "mongoose";



export interface IAudio extends Document {
    _id: string
    title: string,
    description: string
    voicePrompt: string
    cloneAudio: string
    thumbnail: string
    author: string
    duration: string
}

const AudioSchema = new Schema({
    _creationTime: { type: Number },
    title: { type: String, required: true },
    description: { type: String, required: true },
    cloneAudio: { type: Schema.Types.ObjectId, ref: 'CloneAudio', },
    voicePrompt: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" }

})

const Audio = models.Audio || model('Audio', AudioSchema)

export default Audio