import {inject} from '@loopback/core';
import {PgdbDataSource} from '../datasources';
import {Files, FilesRelations} from '../models';
import {SequelizeCrudRepository} from 'loopback4-sequelize';

export class FilesRepository extends SequelizeCrudRepository<
  Files,
  typeof Files.prototype.id,
  FilesRelations
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(Files, dataSource);
  }
}
