import {inject} from '@loopback/core';
import {PgdbDataSource} from '../datasources';
import {Comment, CommentRelations} from '../models';
import {SequelizeCrudRepository} from 'loopback4-sequelize';

export class CommentRepository extends SequelizeCrudRepository<
  Comment,
  typeof Comment.prototype.id,
  CommentRelations
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(Comment, dataSource);
  }
}
