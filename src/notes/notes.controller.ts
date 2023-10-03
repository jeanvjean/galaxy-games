/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  ValidationPipe,
  UseGuards,
  UsePipes,
  Req,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrincipalGuard } from 'src/auth.guard';
import { Request } from 'express';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Version('1')
  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(PrincipalGuard)
  async create(@Body() createNoteDto: CreateNoteDto, @Req() req: Request) {
    // @ts-ignore
    const data = await this.notesService.create(createNoteDto, req.user);

    return {
      data,
      message: 'note created successfully',
    };
  }

  @Version('1')
  @Get()
  @UseGuards(PrincipalGuard)
  async findAll(@Req() req: Request) {
    // @ts-ignore
    const data = await this.notesService.findAll(req.user);

    return {
      data,
      message: 'User Notes fetched successfully',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Version('1')
  @Patch(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(PrincipalGuard)
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return {
      data: await this.notesService.update(id, updateNoteDto),
      message: 'Updated successfully',
    };
  }

  @Version('1')
  @Delete(':id')
  @UseGuards(PrincipalGuard)
  async remove(@Param('id') id: string) {
    return {
      data: this.notesService.remove(id),
      message: 'Deleted successfully',
    };
  }
}
