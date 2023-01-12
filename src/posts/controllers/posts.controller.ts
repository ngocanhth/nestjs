import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from 'src/logger.interceptor';
import { CreatePostDto } from '../dto/createPost.dto';
import { UpdatePostDto } from '../dto/updatePost.dto';
import PostService from '../services/posts.service';
 
@Controller('/posts')
@UseInterceptors(new LoggerInterceptor())

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)

export default class PostsController {
  constructor(
    private readonly postService: PostService
  ) {}
 
  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }
 
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(Number(id));
  }
 
  @Post()
  async createPost(@Body() post: CreatePostDto) {
    
    console.log('post: ', post);

    return this.postService.createPost(post);
  }
 
  // @Put(':id')
  @Patch(':id')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true}))

  async updatePost(@Param('id') id: string, @Body() postDataUpdate: UpdatePostDto) {
    return this.postService.updatePost(id, postDataUpdate);
  }
 
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postService.deletePost(Number(id));
  }
}
