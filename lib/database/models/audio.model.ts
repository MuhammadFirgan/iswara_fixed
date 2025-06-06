import { Document, Schema, model, models } from "mongoose";


export interface IAudio extends Document {
    _id: string
    title: string
    task_id: string
    slug: string
    description?: string
    gender: string
    audio?: string
    thumbnail: string
    author: string
    duration?: string
}

const AudioSchema = new Schema({
    _creationTime: { type: Date, default: Date.now },
    task_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    audio: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" }

})



const Audio = models.Audio || model('Audio', AudioSchema)

export default Audio