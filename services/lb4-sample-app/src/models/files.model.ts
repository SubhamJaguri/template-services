import {Entity, model, property} from '@loopback/repository';

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

  constructor(data?: Partial<Files>) {
    super(data);
  }
}

export interface FilesRelations {
  // describe navigational properties here
}

export type FilesWithRelations = Files & FilesRelations;
