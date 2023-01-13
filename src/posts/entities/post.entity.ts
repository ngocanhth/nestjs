import User from '../../users/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 255, unique: true  })
  @IsNotEmpty()
  public title!: string;

  @Column()
  public content: string;

  @Column({ type: 'varchar', length: 255})
  public url!: string;

  @Column({ nullable: true })
  public category?: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  // @ManyToMany(() => Category, (category: Category) => category.posts)
  // @JoinTable()
  // public categories: Category[];
}

export default Post;