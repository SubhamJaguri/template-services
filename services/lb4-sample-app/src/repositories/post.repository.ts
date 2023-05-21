import {inject} from '@loopback/core';
import {PgdbDataSource} from '../datasources';
import {Post, PostRelations} from '../models';
import {SequelizeCrudRepository} from 'loopback4-sequelize';

export class PostRepository extends SequelizeCrudRepository<
  Post,
  typeof Post.prototype.id,
  PostRelations
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(Post, dataSource);
  }
}
