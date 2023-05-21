import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Files} from '../models';
import {FilesRepository} from '../repositories';

export class FilesController {
  constructor(
    @repository(FilesRepository)
    public filesRepository: FilesRepository,
  ) {}

  @post('/files')
  @response(200, {
    description: 'Files model instance',
    content: {'application/json': {schema: getModelSchemaRef(Files)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Files, {
            title: 'NewFiles',
            exclude: ['id'],
          }),
        },
      },
    })
    files: Omit<Files, 'id'>,
  ): Promise<Files> {
    return this.filesRepository.create(files);
  }

  @get('/files/count')
  @response(200, {
    description: 'Files model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Files) where?: Where<Files>): Promise<Count> {
    return this.filesRepository.count(where);
  }

  @get('/files')
  @response(200, {
    description: 'Array of Files model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Files, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Files) filter?: Filter<Files>): Promise<Files[]> {
    return this.filesRepository.find(filter);
  }

  @patch('/files')
  @response(200, {
    description: 'Files PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Files, {partial: true}),
        },
      },
    })
    files: Files,
    @param.where(Files) where?: Where<Files>,
  ): Promise<Count> {
    return this.filesRepository.updateAll(files, where);
  }

  @get('/files/{id}')
  @response(200, {
    description: 'Files model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Files, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Files, {exclude: 'where'})
    filter?: FilterExcludingWhere<Files>,
  ): Promise<Files> {
    return this.filesRepository.findById(id, filter);
  }

  @patch('/files/{id}')
  @response(204, {
    description: 'Files PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Files, {partial: true}),
        },
      },
    })
    files: Files,
  ): Promise<void> {
    await this.filesRepository.updateById(id, files);
  }

  @put('/files/{id}')
  @response(204, {
    description: 'Files PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() files: Files,
  ): Promise<void> {
    await this.filesRepository.replaceById(id, files);
  }

  @del('/files/{id}')
  @response(204, {
    description: 'Files DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.filesRepository.deleteById(id);
  }
}
