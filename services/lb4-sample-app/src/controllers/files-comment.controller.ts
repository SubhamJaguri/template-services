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
import {Files, Comment} from '../models';
import {FilesRepository} from '../repositories';

export class FilesCommentController {
  constructor(
    @repository(FilesRepository) protected filesRepository: FilesRepository,
  ) {}

  @get('/files/{id}/comments', {
    responses: {
      '200': {
        description: 'Array of Files has many Comment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Comment>,
  ): Promise<Comment[]> {
    return this.filesRepository.comments(id).find(filter);
  }

  @post('/files/{id}/comments', {
    responses: {
      '200': {
        description: 'Files model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Files.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {
            title: 'NewCommentInFiles',
            exclude: ['id'],
            optional: ['fileId'],
          }),
        },
      },
    })
    comment: Omit<Comment, 'id'>,
  ): Promise<Comment> {
    return this.filesRepository.comments(id).create(comment);
  }

  @patch('/files/{id}/comments', {
    responses: {
      '200': {
        description: 'Files.Comment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {partial: true}),
        },
      },
    })
    comment: Partial<Comment>,
    @param.query.object('where', getWhereSchemaFor(Comment))
    where?: Where<Comment>,
  ): Promise<Count> {
    return this.filesRepository.comments(id).patch(comment, where);
  }

  @del('/files/{id}/comments', {
    responses: {
      '200': {
        description: 'Files.Comment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comment))
    where?: Where<Comment>,
  ): Promise<Count> {
    return this.filesRepository.comments(id).delete(where);
  }
}
