import { IsNotEmpty } from 'class-validator';
import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';
 
@Entity()
@Index(['email', 'title'])
@Unique(['title'])
class PostEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
 
  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  public title!: string;
 
  @Column({ type: 'varchar', length: 255})
  public url!: string;

  @Column({ type: 'varchar', length: 255})
  public email!: string;
}
 
export default PostEntity;