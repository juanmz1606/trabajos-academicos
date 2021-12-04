import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Proponente} from './proponente.model';
import {SolicitudProponente} from './solicitud-proponente.model';
import {Modalidad} from './modalidad.model';
import {TipoSolicitud} from './tipo-solicitud.model';
import {EstadoSolicitud} from './estado-solicitud.model';
import {LineaInvestigacion} from './linea-investigacion.model';
import {Comite} from './comite.model';
import {ComiteSolicitud} from './comite-solicitud.model';
import {InvitacionEvaluar} from './invitacion-evaluar.model';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_id_lin_inv: {
        name: 'fk_solicitud_id_lin_inv',
        entity: 'LineaInvestigacion',
        entityKey: 'id',
        foreignKey: 'id_lineaInvestigacion',
      },
      fk_solicitud_id_tip_sol: {
        name: 'fk_solicitud_id_tip_sol',
        entity: 'TipoSolicitud',
        entityKey: 'id',
        foreignKey: 'id_tipoSolicitud',
      },
      fk_solicitud_id_modalidad: {
        name: 'fk_solicitud_id_modalidad',
        entity: 'Modalidad',
        entityKey: 'id',
        foreignKey: 'id_modalidad',
      },
      fk_solicitud_id_est_sol: {
        name: 'fk_solicitud_id_est_sol',
        entity: 'EstadoSolicitud',
        entityKey: 'id',
        foreignKey: 'id_estadoSolicitud',
      }
    },
  },
})
export class Solicitud extends Entity {
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
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreTrabajo: string;

  @property({
    type: 'string',
  })
  archivo?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Proponente, {through: {model: () => SolicitudProponente, keyFrom: 'id_solicitud', keyTo: 'id_proponente'}})
  proponentes: Proponente[];

  @belongsTo(() => Modalidad, {name: 'tiene_modalidad'})
  id_modalidad: number;

  @belongsTo(() => TipoSolicitud, {name: 'tiene_tipoSolicitud'})
  id_tipoSolicitud: number;

  @belongsTo(() => EstadoSolicitud, {name: 'tiene_estadoSolicitud'})
  id_estadoSolicitud: number;

  @belongsTo(() => LineaInvestigacion, {name: 'tiene_lineaInvestigacion'})
  id_lineaInvestigacion: number;

  @hasMany(() => Comite, {through: {model: () => ComiteSolicitud, keyFrom: 'id_solicitud', keyTo: 'id_comite'}})
  comites: Comite[];

  @hasMany(() => InvitacionEvaluar, {keyTo: 'id_solicitud'})
  invitacionesEvaluar: InvitacionEvaluar[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
