import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from '../schemas/schema.notes';
import { UsersModule } from 'src/users/users.module';
import { AuthMiddleware } from '../../src/middlewares/users.middleware';
import { userSchema } from '../schemas/schema.user';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Note', schema: NoteSchema },
      { name: 'User', schema: userSchema },
    ]),
    UsersModule,
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'v1/notes',
      method: RequestMethod.POST,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'v1/notes',
      method: RequestMethod.GET,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'v1/notes/:id',
      method: RequestMethod.PATCH,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'v1/notes/:id',
      method: RequestMethod.DELETE,
    });
  }
}
