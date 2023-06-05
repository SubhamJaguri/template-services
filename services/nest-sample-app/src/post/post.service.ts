import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.enitity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class PostService extends TypeOrmCrudService<Post> {
  constructor(@InjectRepository(Post) repo) {
    super(repo);
  }
}
