import {authenticate} from '@loopback/authentication';
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
  ArregloSolicitudes,
Comite,
ComiteSolicitud,
Solicitud,
} from '../models';
import {ComiteRepository, ComiteSolicitudRepository} from '../repositories';

@authenticate("admin")
export class ComiteSolicitudController {
  constructor(
    @repository(ComiteRepository) protected comiteRepository: ComiteRepository,
    @repository(ComiteSolicitudRepository) protected comiteSolicitudRepository: ComiteSolicitudRepository,
  ) { }

  @authenticate.skip()
  @get('/comites/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Array of Comite has many Solicitud through ComiteSolicitud',
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
    return this.comiteRepository.solicitudes(id).find(filter);
  }

  @post('/comite-solicitud', {
    responses: {
      '200': {
        description: 'create a instance of solicitud with a comite',
        content: {'application/json': {schema: getModelSchemaRef(ComiteSolicitud)}},
      },
    },
  })
  async createRelation(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ComiteSolicitud, {
            title: 'NewSolicitudWithComite',
            exclude: ['id'],
          }),
        },
      },
    }) datos: Omit<ComiteSolicitud, 'id'>,
  ): Promise<ComiteSolicitud | null> {
    let registro = await this.comiteSolicitudRepository.create(datos);
    return registro;
  }

  @post('/asociar-comite-solicitudes/{id}', {
    responses: {
      '200': {
        description: 'create a instance of solicitud with a comite',
        content: {'application/json': {schema: getModelSchemaRef(ComiteSolicitud)}},
      },
    },
  })
  async createRelations(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArregloSolicitudes, {}),
        },
      },
    }) datos: ArregloSolicitudes,
    @param.path.number('id') id_comite: typeof Comite.prototype.id
  ): Promise<Boolean> {
    if (datos.solicitudes.length > 0) {
      datos.solicitudes.forEach(async (id_solicitud: number) => {
        let existe = await this.comiteSolicitudRepository.findOne({
          where: {
            id_comite: id_comite,
            id_solicitud: id_solicitud
          }
        });
        if (!existe) {
          this.comiteSolicitudRepository.create({
            id_comite: id_comite,
            id_solicitud: id_solicitud
          });
        }
      });
      return true
    }
    return false;
  }

  @patch('/comites/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Comite.Solicitud PATCH success count',
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
    return this.comiteRepository.solicitudes(id).patch(solicitud, where);
  }

  @del('/comites/{id_comite}/{id_solicitud}')
  @response(204, {
    description: 'Relation DELETE success',
  })
  async EliminarSolicitud(
    @param.path.number('id_comite') id_comite: number,
    @param.path.number('id_solicitud') id_solicitud: number): Promise<Boolean> {
    let registro = await this.comiteSolicitudRepository.findOne({
      where: {
        id_comite: id_comite,
        id_solicitud: id_solicitud
      }
    });
    if (registro) {
      await this.comiteSolicitudRepository.deleteById(registro.id);
      return true;
    }
    return false;
  }
}
