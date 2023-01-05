import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostsController from './controllers/posts.controller';
import PostEntity from './entities/post.entity';
import PostService from './services/posts.service';
 
@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostsController],
  providers: [PostService],
})
export class PostsModule {}