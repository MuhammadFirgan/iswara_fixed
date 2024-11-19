import { model, models, Schema } from "mongoose";

const RoleSchema = new Schema({
    name: { type: String, required: true }
})

const Role = models.role || model('role', RoleSchema)

export default Role