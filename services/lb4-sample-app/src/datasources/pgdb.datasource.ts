import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {AnyObject} from '@loopback/repository';
import {SequelizeDataSource} from 'loopback4-sequelize';

const config = {
  name: 'pgdb',
  connector: 'postgresql',
  url: '',
  host: 'db',
  port: 0,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PgdbDataSource
  extends SequelizeDataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'pgdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.pgdb', {optional: true})
    dsConfig: object = config,
  ) {
    const configEnv: AnyObject = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      sequelizeOptions: {
        logging: console.log,
      },
    };
    Object.assign(dsConfig, configEnv);
    super(dsConfig);
  }
}
