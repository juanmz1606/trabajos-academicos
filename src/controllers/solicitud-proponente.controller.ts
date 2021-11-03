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
  response,
} from '@loopback/rest';
import {
  Solicitud,
  SolicitudProponente,
  Proponente,
  ArregloProponentes,
} from '../models';
import {SolicitudRepository, SolicitudProponenteRepository} from '../repositories';

export class SolicitudProponenteController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
    @repository(SolicitudProponenteRepository) protected SolicitudProponenteRepository: SolicitudProponenteRepository,
  ) { }

  @get('/solicitudes/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Proponente through SolicitudProponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proponente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Proponente>,
  ): Promise<Proponente[]> {
    return this.solicitudRepository.proponentes(id).find(filter);
  }

  @post('/solicitud-proponente', {
    responses: {
      '200': {
        description: 'create a instance of proponente with a solicitud',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudProponente)}},
      },
    },
  })
  async createRelation(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudProponente, {
            title: 'NewProponenteWithSolicitud',
            exclude: ['id'],
          }),
        },
      },
    }) datos: Omit<SolicitudProponente, 'id'>,
  ): Promise<SolicitudProponente | null> {
    let registro = await this.SolicitudProponenteRepository.create(datos);
    return registro;
  }

  @post('/asociar-solicitud-proponente/{id}', {
    responses: {
      '200': {
        description: 'create a instance of proponente with a solicitud',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudProponente)}},
      },
    },
  })
  async createRelations(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArregloProponentes, {}),
        },
      },
    }) datos: ArregloProponentes,
    @param.path.number('id') id_solicitud: typeof Solicitud.prototype.id
  ): Promise<Boolean> {
    if (datos.proponentes.length > 0) {
      datos.proponentes.forEach(async (id_proponente: number) => {
        let existe = await this.SolicitudProponenteRepository.findOne({
          where: {
            id_solicitud: id_solicitud,
            id_proponente: id_proponente
          }
        });
        if (!existe) {
          this.SolicitudProponenteRepository.create({
            id_solicitud: id_solicitud,
            id_proponente: id_proponente
          });
        }
      });
      return true
    }
    return false;
  }

  @patch('/solicitudes/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Solicitud.Proponente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {partial: true}),
        },
      },
    })
    proponente: Partial<Proponente>,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.solicitudRepository.proponentes(id).patch(proponente, where);
  }

  @del('/solicitudes/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Solicitud.Proponente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.solicitudRepository.proponentes(id).delete(where);
  }

  @del('/solicitudes/{id_solicitud}/{id_proponente}')
  @response(204, {
    description: 'Relation DELETE success',
  })
  async EliminarProponente(
    @param.path.number('id_solicitud') id_solicitud: number,
    @param.path.number('id_proponente') id_proponente: number): Promise<Boolean> {
    let registro = await this.SolicitudProponenteRepository.findOne({
      where: {
        id_solicitud: id_solicitud,
        id_proponente: id_proponente
      }
    });
    if (registro) {
      await this.SolicitudProponenteRepository.deleteById(registro.id);
      return true;
    }
    return false;
  }
}
