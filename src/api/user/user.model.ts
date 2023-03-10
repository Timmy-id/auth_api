import {
    DocumentType,
    getModelForClass,
    index,
    modelOptions,
    pre,
    prop
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

@index({ email: 1 })
@pre<User>('save', async function () {
    // Hash the user password if new or updated
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})

export class User {
    @prop({ required: true })
    name: string;

    @prop({ unique: true, required: true })
    email: string;

    @prop({ required: true, minlength: 8, maxlength: 32, select: false })
    password: string;

    @prop({ default: 'user' })
    role: string;

    // instance ethod to check if the password match
    async comparePasswords(hashedPassword: string, candidatePassword: string) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }
}

// Create the user model
const userModel = getModelForClass(User);
export default userModel;