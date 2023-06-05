import {Entity, model, property, hasMany} from '@loopback/repository';
import {Comment} from './comment.model';

@model()
export class Files extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
    required: true,
  })
  adminId: number;

  @hasMany(() => Comment, {keyTo: 'fileId'})
  comments: Comment[];

  constructor(data?: Partial<Files>) {
    super(data);
  }
}

export interface FilesRelations {
  // describe navigational properties here
}

export type FilesWithRelations = Files & FilesRelations;
