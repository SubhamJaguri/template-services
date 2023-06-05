import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/post/post.enitity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  username: string;
  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
