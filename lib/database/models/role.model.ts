import mongoose, { models, Schema } from "mongoose";

const RoleSchema = new Schema({
    name: { type: String, required: true }
})

const Role = models.Role || mongoose.model('Role', RoleSchema)

export default Role