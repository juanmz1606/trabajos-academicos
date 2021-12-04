import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {ProponenteDepartamento} from './proponente-departamento.model';
import {TipoVinculacion} from './tipo-vinculacion.model';
import {Solicitud} from './solicitud.model';
import {SolicitudProponente} from './solicitud-proponente.model';

@model({
  settings: {
    foreignKeys: {
      fk_proponente_id_tip_vin: {
        name: 'fk_proponente_id_tip_vin',
        entity: 'TipoVinculacion',
        entityKey: 'id',
        foreignKey: 'id_tipoVinculacion',
      }
    },
  },
})
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
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
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

  @hasMany(() => Solicitud, {through: {model: () => SolicitudProponente, keyFrom: 'id_proponente', keyTo: 'id_solicitud'}})
  solicitudes: Solicitud[];

  @belongsTo(() => TipoVinculacion, {name: 'tiene_tipoVinculacion'})
  id_tipoVinculacion: number;

  constructor(data?: Partial<Proponente>) {
    super(data);
  }
}

export interface ProponenteRelations {
  // describe navigational properties here
}

export type ProponenteWithRelations = Proponente & ProponenteRelations;
