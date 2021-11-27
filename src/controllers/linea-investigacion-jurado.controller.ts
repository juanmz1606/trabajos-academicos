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
} from '@loopback/rest';
import {
LineaInvestigacion,
JuradoLineaInvestigacion,
Jurado,
} from '../models';
import {LineaInvestigacionRepository} from '../repositories';

@authenticate("admin")
export class LineaInvestigacionJuradoController {
  constructor(
    @repository(LineaInvestigacionRepository) protected lineaInvestigacionRepository: LineaInvestigacionRepository,
  ) { }

  @authenticate.skip()
  @get('/lineas-investigacion/{id}/jurados', {
    responses: {
      '200': {
        description: 'Array of LineaInvestigacion has many Jurado through JuradoLineaInvestigacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Jurado>,
  ): Promise<Jurado[]> {
    return this.lineaInvestigacionRepository.jurados(id).find(filter);
  }

  @post('/lineas-investigacion/{id}/jurados', {
    responses: {
      '200': {
        description: 'create a Jurado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jurado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof LineaInvestigacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {
            title: 'NewJuradoInLineaInvestigacion',
            exclude: ['id'],
          }),
        },
      },
    }) jurado: Omit<Jurado, 'id'>,
  ): Promise<Jurado> {
    return this.lineaInvestigacionRepository.jurados(id).create(jurado);
  }

  @patch('/lineas-investigacion/{id}/jurados', {
    responses: {
      '200': {
        description: 'LineaInvestigacion.Jurado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {partial: true}),
        },
      },
    })
    jurado: Partial<Jurado>,
    @param.query.object('where', getWhereSchemaFor(Jurado)) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.lineaInvestigacionRepository.jurados(id).patch(jurado, where);
  }

  @del('/lineas-investigacion/{id}/jurados', {
    responses: {
      '200': {
        description: 'LineaInvestigacion.Jurado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Jurado)) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.lineaInvestigacionRepository.jurados(id).delete(where);
  }
}
