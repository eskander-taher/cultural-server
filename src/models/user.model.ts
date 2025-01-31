import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the user roles
enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

// Define the User interface
interface IUser extends  mongoose.Document {
  email: string;
  password: string;
  role: UserRole;
  comparePassword: (password: string) => Promise<boolean>;
}

// Define the User schema
const UserSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.ADMIN,
  },
}, {
  timestamps: true,
});

// Pre-save hook to hash the password
UserSchema.pre<IUser>('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Create and export the User model
const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;
