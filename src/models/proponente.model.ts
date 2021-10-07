import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {ProponenteDepartamento} from './proponente-departamento.model';
import {TipoVinculacion} from './tipo-vinculacion.model';
import {Solicitud} from './solicitud.model';
import {SolicitudProponente} from './solicitud-proponente.model';

@model()
export class Proponente extends Entity {
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
  primerNombre: string;

  @property({
    type: 'string',
  })
  otrosNombres?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  segundoApellido: string;

  @property({
    type: 'number',
    required: true,
  })
  documento: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  celular?: string;

  @property({
    type: 'string',
  })
  fotografia?: string;

  @hasMany(() => Departamento, {through: {model: () => ProponenteDepartamento, keyFrom: 'id_proponente', keyTo: 'id_departamento'}})
  departamentos: Departamento[];

  @belongsTo(() => TipoVinculacion, {name: 'tiene_tipoVinculacion'})
  id_tipoVinculacion: number;

  @hasMany(() => Solicitud, {through: {model: () => SolicitudProponente, keyFrom: 'id_proponente', keyTo: 'id_solicitud'}})
  solicitudes: Solicitud[];

  constructor(data?: Partial<Proponente>) {
    super(data);
  }
}

export interface ProponenteRelations {
  // describe navigational properties here
}

export type ProponenteWithRelations = Proponente & ProponenteRelations;
