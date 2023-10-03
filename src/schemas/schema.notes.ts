import { Schema, Document } from 'mongoose';

export interface NoteInterface extends Document {
  title: string;
  content: string;
  creator: Schema.Types.ObjectId;
}

export const NoteSchema = new Schema(
  {
    title: String,
    content: String,
    creator: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);
