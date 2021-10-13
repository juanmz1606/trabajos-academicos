import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_jurado_lin_inv_id_lin_inv: {
        name: 'fk_jurado_lin_inv_id_lin_inv',
        entity: 'LineaInvestigacion',
        entityKey: 'id',
        foreignKey: 'id_lineaInvestigacion',
      },
      fk_jurado_lin_inv_id_jurado: {
        name: 'fk_jurado_lin_inv_id_jurado',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado',
      }
    },
  },
})
export class JuradoLineaInvestigacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_lineaInvestigacion?: number;

  @property({
    type: 'number',
  })
  id_jurado?: number;

  constructor(data?: Partial<JuradoLineaInvestigacion>) {
    super(data);
  }
}

export interface JuradoLineaInvestigacionRelations {
  // describe navigational properties here
}

export type JuradoLineaInvestigacionWithRelations = JuradoLineaInvestigacion & JuradoLineaInvestigacionRelations;
