import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/createPost.dto';
import { UpdatePostDto } from '../dto/updatePost.dto';
import PostEntity from '../entities/post.entity';
import { Post } from '../interfaces/post.interface';
 
@Injectable()
export default class PostService {

  private readonly logger = new Logger(PostService.name);

  // private lastPostId = 0;
  // private posts: Post[] = [];

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}
 
  // getAllPosts() {
  //   return this.posts;
  //   //return this.postsRepository.find();
  // }

  public async getPostById(id: number) {
    const post = await this.postRepository.findOne({where: {id}});
    if (!post) {
      throw new HttpException(`Post with this id = ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    return post;
  }

  public async getByTitle(title: string) {
    return await this.postRepository.findOne({ where: { title } });
  }

  public async createPost(postDto: CreatePostDto): Promise<Post> {
    const post = await this.getByTitle(postDto.title);
    if (post) {
      throw new HttpException('Post with this title already exist', HttpStatus.CONFLICT);
    }
    const newPost = await this.postRepository.create(postDto);
    const postData = await this.postRepository.save(newPost);
    // await this.searchService.indexPost(postData);
    // this.eventEmitter.emit('user.created', {});
    return postData;
  }

  public async getAllPosts() {
    const posts: PostEntity[] = await this.postRepository.find();
    if (posts.length == 0) {
      throw new HttpException('No posts found', HttpStatus.NO_CONTENT);
    }
    return posts;
  }


  async updatePost(
    id: string,
    postDataUpdate: UpdatePostDto
  ): Promise<Post> {
    const post = await this.postRepository.findOneBy({
      id: Number(id)
    })

    if (!post) {
      throw new HttpException(`Post with this id = ${id} does not exist`, HttpStatus.NOT_FOUND);
    }

    const findPostByTitle = await this.getByTitle(postDataUpdate.title);
    if (findPostByTitle && postDataUpdate.title != post.title) {
      throw new HttpException('Post with this title already exist', HttpStatus.CONFLICT);
    }

   const newPost = {
      ...post,
      ...postDataUpdate
    }

    const postUpdate = await this.postRepository.save(newPost);
    return postUpdate
  }

  public async deletePost(id: number) {
    try {
      const post = await this.getPostById(id);

      await this.postRepository.remove(post);

      return {
        success: true,
        message: `post with id = ${id} deleted`,
      };

    } catch (err) {
      console.log(err);
    }
  }
 
  // async getPostById(id: number) {
  //   const post = this.posts.find(post => post.id === id);
  //   if (post) {
  //     return post;
  //   }
  //   throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

  //   // const post = await this.postsRepository.findOne(id);
  //   // if (post) {
  //   //   return post;
  //   // }
  //   // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  // }
 
  // replacePost(id: number, post: UpdatePostDto) {
  //   const postIndex = this.posts.findIndex(post => post.id === id);
  //   if (postIndex > -1) {
  //     this.posts[postIndex] = post;
  //     return post;
  //   }
  //   throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  // }
 
  // async getPostById(id: number) {
  //   const post = await this.postRepository.findOne(id);
  //   if (post) {
  //     return post;
  //   }
  //   throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  // }
 
  // deletePost(id: number) {
  //   const postIndex = this.posts.findIndex(post => post.id === id);
  //   if (postIndex > -1) {
  //     this.posts.splice(postIndex, 1);
  //   } else {
  //     throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  //   }
  // }
}

