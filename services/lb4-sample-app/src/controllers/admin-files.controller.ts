import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Admin, Files} from '../models';
import {AdminRepository} from '../repositories';

export class AdminFilesController {
  constructor(
    @repository(AdminRepository) protected adminRepository: AdminRepository,
  ) {}

  @get('/admins/{id}/files', {
    responses: {
      '200': {
        description: 'Array of Admin has many Files',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Files)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Files>,
  ): Promise<Files[]> {
    return this.adminRepository.files(id).find(filter);
  }

  @post('/admins/{id}/files', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: {'application/json': {schema: getModelSchemaRef(Files)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Admin.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Files, {
            title: 'NewFilesInAdmin',
            exclude: ['id'],
            optional: ['adminId'],
          }),
        },
      },
    })
    files: Omit<Files, 'id'>,
  ): Promise<Files> {
    return this.adminRepository.files(id).create(files);
  }

  @patch('/admins/{id}/files', {
    responses: {
      '200': {
        description: 'Admin.Files PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Files, {partial: true}),
        },
      },
    })
    files: Partial<Files>,
    @param.query.object('where', getWhereSchemaFor(Files)) where?: Where<Files>,
  ): Promise<Count> {
    return this.adminRepository.files(id).patch(files, where);
  }

  @del('/admins/{id}/files', {
    responses: {
      '200': {
        description: 'Admin.Files DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Files)) where?: Where<Files>,
  ): Promise<Count> {
    return this.adminRepository.files(id).delete(where);
  }
}
