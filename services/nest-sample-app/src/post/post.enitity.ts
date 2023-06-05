import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entiity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
