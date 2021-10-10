import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  LineaInvestigacion,
  Solicitud,
} from '../models';
import {LineaInvestigacionRepository} from '../repositories';

export class LineaInvestigacionSolicitudController {
  constructor(
    @repository(LineaInvestigacionRepository) protected lineaInvestigacionRepository: LineaInvestigacionRepository,
  ) { }

  @get('/lineas-investigacion/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Array of LineaInvestigacion has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.lineaInvestigacionRepository.solicitudes(id).find(filter);
  }

  @post('/lineas-investigacion/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'LineaInvestigacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof LineaInvestigacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInLineaInvestigacion',
            exclude: ['id'],
            optional: ['id_lineaInvestigacion']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.lineaInvestigacionRepository.solicitudes(id).create(solicitud);
  }

  @patch('/lineas-investigacion/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'LineaInvestigacion.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.lineaInvestigacionRepository.solicitudes(id).patch(solicitud, where);
  }

  @del('/lineas-investigacion/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'LineaInvestigacion.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.lineaInvestigacionRepository.solicitudes(id).delete(where);
  }
}
