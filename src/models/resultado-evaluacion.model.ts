import {Entity, model, property, belongsTo} from '@loopback/repository';
import {InvitacionEvaluar} from './invitacion-evaluar.model';

@model({
  settings: {
    foreignKeys: {
      fk_res_eva_id_inv_eva: {
        name: 'fk_res_eva_id_inv_eva',
        entity: 'InvitacionEvaluar',
        entityKey: 'id',
        foreignKey: 'id_invitacionEvaluar',
      }
    },
  },
})
export class ResultadoEvaluacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  formatoDiligenciado: string;

  @belongsTo(() => InvitacionEvaluar, {name: 'tiene_invitacionEvaluar'})
  id_invitacionEvaluar: number;

  constructor(data?: Partial<ResultadoEvaluacion>) {
    super(data);
  }
}

export interface ResultadoEvaluacionRelations {
  // describe navigational properties here
}

export type ResultadoEvaluacionWithRelations = ResultadoEvaluacion & ResultadoEvaluacionRelations;
