import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import RequestWithUser from '../../authentication/requestWithUser.interface';
import JwtAuthenticationGuard from '../../authentication/jwt-authentication.guard';
import { LoggerInterceptor } from '../../logger.interceptor';
import { CreatePostDto } from '../dto/createPost.dto';
import { UpdatePostDto } from '../dto/updatePost.dto';
import PostService from '../services/posts.service';
import FindOneParams from '../../utils/findOneParams';
 
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
  getPostById(@Param() { id }: FindOneParams) {
    return this.postService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    console.log('post: ', post);
    
    return this.postService.createPost(post, req.user);
  }

  @Patch(':id')
  async updatePost(@Param() { id }: FindOneParams, @Body() post: UpdatePostDto) {
    return this.postService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: FindOneParams) {
    return this.postService.deletePost(Number(id));
  }
}
