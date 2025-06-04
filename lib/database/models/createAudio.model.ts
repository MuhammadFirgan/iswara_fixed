import { Document, Schema, model, models } from "mongoose";

export interface ITaskId extends Document {
    _id: string
    title: string
    task_id: string
    slug: string
    // lyrics: string
    gender: string
    thumbnail: string
    audio: string
    author: string
    // duration: string
}

const createAudioSchema = new Schema({
    _creationTime: { type: Date, default: Date.now },
    task_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    thumbnail: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" }

})

const CreateAudio = models.CreateAudio || model('CreateAudio', createAudioSchema)

export default CreateAudio