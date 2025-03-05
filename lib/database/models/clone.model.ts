import { Document, model, models, Schema } from "mongoose";
import { unique } from "next/dist/build/utils";


export interface IClone extends Document {
    _id: string
    name: string
    fileUrl: string
}

const CloneSchema = new Schema({
    name: { type: String, required: true, unique: true },
    fileUrl: { type: String, required: true, unique: true }
})

const CloneAudio = models.CloneAudio || model('CloneAudio', CloneSchema)
export default CloneAudio