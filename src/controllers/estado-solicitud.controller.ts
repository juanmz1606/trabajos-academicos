import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EstadoSolicitud} from '../models';
import {EstadoSolicitudRepository} from '../repositories';


@authenticate("admin")
export class EstadoSolicitudController {
  constructor(
    @repository(EstadoSolicitudRepository)
    public estadoSolicitudRepository : EstadoSolicitudRepository,
  ) {}

  @post('/estados-solicitud')
  @response(200, {
    description: 'EstadoSolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoSolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoSolicitud, {
            title: 'NewEstadoSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    estadoSolicitud: Omit<EstadoSolicitud, 'id'>,
  ): Promise<EstadoSolicitud> {
    return this.estadoSolicitudRepository.create(estadoSolicitud);
  }

  @get('/estados-solicitud/count')
  @response(200, {
    description: 'EstadoSolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoSolicitud) where?: Where<EstadoSolicitud>,
  ): Promise<Count> {
    return this.estadoSolicitudRepository.count(where);
  }

  @authenticate.skip()
  @get('/estados-solicitud')
  @response(200, {
    description: 'Array of EstadoSolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoSolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoSolicitud) filter?: Filter<EstadoSolicitud>,
  ): Promise<EstadoSolicitud[]> {
    return this.estadoSolicitudRepository.find(filter);
  }

  @patch('/estados-solicitud')
  @response(200, {
    description: 'EstadoSolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoSolicitud, {partial: true}),
        },
      },
    })
    estadoSolicitud: EstadoSolicitud,
    @param.where(EstadoSolicitud) where?: Where<EstadoSolicitud>,
  ): Promise<Count> {
    return this.estadoSolicitudRepository.updateAll(estadoSolicitud, where);
  }

  @authenticate.skip()
  @get('/estados-solicitud/{id}')
  @response(200, {
    description: 'EstadoSolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoSolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EstadoSolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoSolicitud>
  ): Promise<EstadoSolicitud> {
    return this.estadoSolicitudRepository.findById(id, filter);
  }

  @patch('/estados-solicitud/{id}')
  @response(204, {
    description: 'EstadoSolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoSolicitud, {partial: true}),
        },
      },
    })
    estadoSolicitud: EstadoSolicitud,
  ): Promise<void> {
    await this.estadoSolicitudRepository.updateById(id, estadoSolicitud);
  }

  @put('/estados-solicitud/{id}')
  @response(204, {
    description: 'EstadoSolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estadoSolicitud: EstadoSolicitud,
  ): Promise<void> {
    await this.estadoSolicitudRepository.replaceById(id, estadoSolicitud);
  }

  @del('/estados-solicitud/{id}')
  @response(204, {
    description: 'EstadoSolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estadoSolicitudRepository.deleteById(id);
  }
}
