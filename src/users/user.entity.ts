import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Address from './address.entity';
import Post from '../posts/entities/post.entity';
@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  @Expose()
  public email: string;

  @Column()
  @Expose()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @Expose()
  @OneToOne(() => Address, {
    eager: true, // include các bảng ngoại vào trong response
    cascade: true,
    onDelete: "CASCADE",
    nullable: true
  })
  @JoinColumn()
 // @JoinColumn({ name: "addresss_id" }) ==> Co the tao id tuy chinh
  public address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}

export default User;