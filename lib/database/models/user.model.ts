import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
    _id: string
    fullName: string
    email: string
    nip: string
    photo: string
    password: string
    role: { _id: string, name: string }
}

const UserSchema = new Schema({
    fullName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    nip: { type: String, require: true, unique: true },
    photo: { type: String },
    password: { type: String },
    role: { type: Schema.ObjectId, ref: "role" }
})

const User = models.user || model('user', UserSchema)

export default User