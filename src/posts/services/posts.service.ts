import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../users/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/createPost.dto';
import { UpdatePostDto } from '../dto/updatePost.dto';
import PostEntity from '../entities/post.entity';
import { Post } from '../interfaces/post.interface';
import PostNotFoundException from '../exceptions/postNotFound.exception';
 
@Injectable()
export default class PostService {

  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  public async getPostById(id: number) {
    const post = await this.postRepository.findOne({where: {id}});
    if (!post) {
      throw new HttpException(`Post with this id = ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    return post;
  }

  // async getPostById(id: number) {
  //   const post = await this.postsRepository.findOne(id, { relations: ['author'] });
  //   if (post) {
  //     return post;
  //   }
  //   throw new PostNotFoundException(id);
  // }

  public async getByTitle(title: string) {
    return await this.postRepository.findOne({ where: { title } });
  }

  // async createPost(postDto: CreatePostDto, user: User) {
  //   const post = await this.getByTitle(postDto.title);
  //   if (post) {
  //     throw new HttpException('Post with this title already exist', HttpStatus.CONFLICT);
  //   }

  //   const newPost = await this.postRepository.create({
  //     ...post,
  //     author: user
  //   });

  //   await this.postRepository.save(newPost);
  //   return newPost;
  // }

  // async createPost(postDto: CreatePostDto, user: User): Promise<PostEntity> {
   

  //   const post = await this.getByTitle(postDto.title);
    
  //   // if (post) {
  //   //   throw new HttpException('Post with this title already exist', HttpStatus.CONFLICT);
  //   // }
  //   const newPost = await this.postRepository.create({
  //     ...post,
  //     author: user
  //   });

  //   await this.postRepository.save(newPost);
  //   return newPost;
  // }

  async createPost(post: CreatePostDto, user: User) {
    const newPost: PostEntity = await this.postRepository.create({
      ...post,
      author: user
    });
    await this.postRepository.save(newPost);
    return newPost;
  }


  // public async getAllPosts() {
  //   const posts: PostEntity[] = await this.postRepository.find();
  //   if (posts.length == 0) {
  //     throw new HttpException('No posts found', HttpStatus.NO_CONTENT);
  //   }
  //   return posts;
  // }

  public async getAllPosts() {
    return this.postRepository.find({ relations: ['author'] });
  }
   

  // async updatePost(
  //   id: string,
  //   postDataUpdate: UpdatePostDto
  // ): Promise<Post> {
  //   const post = await this.postRepository.findOneBy({
  //     id: Number(id)
  //   })

  //   if (!post) {
  //     throw new HttpException(`Post with this id = ${id} does not exist`, HttpStatus.NOT_FOUND);
  //   }

  //   const findPostByTitle = await this.getByTitle(postDataUpdate.title);
  //   if (findPostByTitle && postDataUpdate.title != post.title) {
  //     throw new HttpException('Post with this title already exist', HttpStatus.CONFLICT);
  //   }

  //  const newPost = {
  //     ...post,
  //     ...postDataUpdate
  //   }

  //   const postUpdate = await this.postRepository.save(newPost);
  //   return postUpdate
  // }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postRepository.update(id, post);
    const updatedPost = await this.postRepository.findOne({
      where: {
        id,
      },
    });

    if (updatedPost) {
      return updatedPost
    }
    throw new PostNotFoundException(id);
  }
  
  // public async deletePost(id: number) {
  //   try {
  //     const post = await this.getPostById(id);

  //     await this.postRepository.remove(post);

  //     return {
  //       success: true,
  //       message: `post with id = ${id} deleted`,
  //     };

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async deletePost(id: number) {
    const deleteResponse = await this.postRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}

