import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Jurado} from './jurado.model';
import {JuradoLineaInvestigacion} from './jurado-linea-investigacion.model';

@model()
export class LineaInvestigacion extends Entity {
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
  nombre: string;

  @hasMany(() => Solicitud, {keyTo: 'id_lineaInvestigacion'})
  solicitudes: Solicitud[];

  @hasMany(() => Jurado, {through: {model: () => JuradoLineaInvestigacion, keyFrom: 'id_lineaInvestigacion', keyTo: 'id_jurado'}})
  jurados: Jurado[];

  constructor(data?: Partial<LineaInvestigacion>) {
    super(data);
  }
}

export interface LineaInvestigacionRelations {
  // describe navigational properties here
}

export type LineaInvestigacionWithRelations = LineaInvestigacion & LineaInvestigacionRelations;
