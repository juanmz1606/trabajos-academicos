import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Jurado} from './jurado.model';
import {ResultadoEvaluacion} from './resultado-evaluacion.model';
import {Recordatorio} from './recordatorio.model';

@model()
export class InvitacionEvaluar extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaInvitacion: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRespuesta: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoInvitacion: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Solicitud, {name: 'tiene_solicitud'})
  id_solicitud: number;

  @belongsTo(() => Jurado, {name: 'tiene_jurado'})
  id_jurado: number;

  @hasMany(() => ResultadoEvaluacion, {keyTo: 'id_invitacionEvaluar'})
  resultadosEvaluacion: ResultadoEvaluacion[];

  @hasMany(() => Recordatorio, {keyTo: 'id_invitacionEvaluar'})
  recordatorios: Recordatorio[];

  constructor(data?: Partial<InvitacionEvaluar>) {
    super(data);
  }
}

export interface InvitacionEvaluarRelations {
  // describe navigational properties here
}

export type InvitacionEvaluarWithRelations = InvitacionEvaluar & InvitacionEvaluarRelations;
