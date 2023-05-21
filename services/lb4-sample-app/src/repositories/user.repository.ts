import {inject, Getter} from '@loopback/core';
import {repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {User, UserRelations, Post} from '../models';
import {PostRepository} from './post.repository';
import {SequelizeCrudRepository} from 'loopback4-sequelize';

export class UserRepository extends SequelizeCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly posts: HasManyRepositoryFactory<
    Post,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @repository.getter('PostRepository')
    protected postRepositoryGetter: Getter<PostRepository>,
  ) {
    super(User, dataSource);
    this.posts = this.createHasManyRepositoryFactoryFor(
      'posts',
      postRepositoryGetter,
    );
    this.registerInclusionResolver('posts', this.posts.inclusionResolver);
  }
}
