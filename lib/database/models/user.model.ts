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
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    nip: { type: String, required: true, unique: true },
    photo: { type: String },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role" }
})

const User = models.User || model('User', UserSchema)

export default User