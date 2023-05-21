import {inject, Getter} from '@loopback/core';
import {repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {Admin, AdminRelations, Files} from '../models';
import {FilesRepository} from './files.repository';
import {SequelizeCrudRepository} from 'loopback4-sequelize';

export class AdminRepository extends SequelizeCrudRepository<
  Admin,
  typeof Admin.prototype.id,
  AdminRelations
> {
  public readonly files: HasManyRepositoryFactory<
    Files,
    typeof Admin.prototype.id
  >;

  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @repository.getter('FilesRepository')
    protected filesRepositoryGetter: Getter<FilesRepository>,
  ) {
    super(Admin, dataSource);
    this.files = this.createHasManyRepositoryFactoryFor(
      'files',
      filesRepositoryGetter,
    );
    this.registerInclusionResolver('files', this.files.inclusionResolver);
  }
}
