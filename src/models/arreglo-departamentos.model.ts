import {Model, model, property} from '@loopback/repository';

@model()
export class ArregloDepartamentos extends Model {
  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  departamentos: number[];


  constructor(data?: Partial<ArregloDepartamentos>) {
    super(data);
  }
}

export interface ArregloDepartamentosRelations {
  // describe navigational properties here
}

export type ArregloDepartamentosWithRelations = ArregloDepartamentos & ArregloDepartamentosRelations;
