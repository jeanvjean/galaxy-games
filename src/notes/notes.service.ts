import { NoteInterface } from './../schemas/schema.notes';
import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from '../schemas/schema.user';

@Injectable()
export class NotesService {
  @InjectModel('Note')
  private readonly noteModel: Model<NoteInterface>;
  async create(createNoteDto: CreateNoteDto, user: UserInterface) {
    const note = new this.noteModel({ ...createNoteDto, creator: user._id });
    await note.save();
    return note;
  }

  async findAll(user: UserInterface) {
    const userNotes = await this.noteModel.find({ creator: user._id });
    return userNotes;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const updatedNotes = await this.noteModel.findByIdAndUpdate(
      id,
      { ...updateNoteDto },
      { new: true },
    );
    return updatedNotes;
  }

  async remove(id: string) {
    const deleted = await this.noteModel.findByIdAndRemove(id);
    return deleted;
  }
}
