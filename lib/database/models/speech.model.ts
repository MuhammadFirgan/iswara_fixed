import { Document, Schema, model, models } from "mongoose";

export interface ISpeech extends Document {
    _id: string
    title: string
    job_id: string
    slug: string
    // lyrics: string
    thumbnail: string
    tts_model: string
    url: string
    author: string
    duration: string
}

const speechSchema = new Schema({
    _creationTime: { type: Date, default: Date.now },
    job_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tts_model: { type: String },
    url: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" }
})

const Speech = models.Speech || model('Speech', speechSchema)

export default Speech