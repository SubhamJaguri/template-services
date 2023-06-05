import {inject, Getter} from '@loopback/core';
import {PgdbDataSource} from '../datasources';
import {Files, FilesRelations, Comment} from '../models';
import {SequelizeCrudRepository} from 'loopback4-sequelize';
import {repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CommentRepository} from './comment.repository';

export class FilesRepository extends SequelizeCrudRepository<
  Files,
  typeof Files.prototype.id,
  FilesRelations
> {
  public readonly comments: HasManyRepositoryFactory<
    Comment,
    typeof Files.prototype.id
  >;

  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @repository.getter('CommentRepository')
    protected commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(Files, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor(
      'comments',
      commentRepositoryGetter,
    );
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
  }
}
