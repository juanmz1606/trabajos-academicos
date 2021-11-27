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
  ArregloLineasInvestigacion,
  Jurado,
  JuradoLineaInvestigacion,
  LineaInvestigacion,
} from '../models';
import {JuradoLineaInvestigacionRepository, JuradoRepository} from '../repositories';

@authenticate("admin")
export class JuradoLineaInvestigacionController {
  constructor(
    @repository(JuradoRepository) protected juradoRepository: JuradoRepository,
    @repository(JuradoLineaInvestigacionRepository) protected juradoLineaInvestigacionRepository: JuradoLineaInvestigacionRepository,
  ) { }

  @authenticate.skip()
  @get('/jurados/{id}/lineas-investigacion', {
    responses: {
      '200': {
        description: 'Array of Jurado has many LineaInvestigacion through JuradoLineaInvestigacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LineaInvestigacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<LineaInvestigacion>,
  ): Promise<LineaInvestigacion[]> {
    return this.juradoRepository.lineasInvestigacion(id).find(filter);
  }

  @post('/jurado-linea-investigacion', {
    responses: {
      '200': {
        description: 'create a instance of linea-investigacion with a jurado',
        content: {'application/json': {schema: getModelSchemaRef(JuradoLineaInvestigacion)}},
      },
    },
  })
  async createRelation(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoLineaInvestigacion, {
            title: 'NewLineaInvestigacionWithJurado',
            exclude: ['id'],
          }),
        },
      },
    }) datos: Omit<JuradoLineaInvestigacion, 'id'>,
  ): Promise<JuradoLineaInvestigacion | null> {
    let registro = await this.juradoLineaInvestigacionRepository.create(datos);
    return registro;
  }

  @post('/asociar-jurado-lineas-investigacion/{id}', {
    responses: {
      '200': {
        description: 'create a instance of linea-investigacion with a jurado',
        content: {'application/json': {schema: getModelSchemaRef(JuradoLineaInvestigacion)}},
      },
    },
  })
  async createRelations(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArregloLineasInvestigacion, {}),
        },
      },
    }) datos: ArregloLineasInvestigacion,
    @param.path.number('id') id_jurado: typeof Jurado.prototype.id
  ): Promise<Boolean> {
    if (datos.lineas_investigacion.length > 0) {
      datos.lineas_investigacion.forEach(async (id_linea: number) => {
        let existe = await this.juradoLineaInvestigacionRepository.findOne({
          where: {
            id_jurado: id_jurado,
            id_lineaInvestigacion: id_linea
          }
        });
        if (!existe) {
          this.juradoLineaInvestigacionRepository.create({
            id_jurado: id_jurado,
            id_lineaInvestigacion: id_linea
          });
        }
      });
      return true
    }
    return false;
  }

  @patch('/jurados/{id}/lineas-investigacion', {
    responses: {
      '200': {
        description: 'Jurado.LineaInvestigacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaInvestigacion, {partial: true}),
        },
      },
    })
    lineaInvestigacion: Partial<LineaInvestigacion>,
    @param.query.object('where', getWhereSchemaFor(LineaInvestigacion)) where?: Where<LineaInvestigacion>,
  ): Promise<Count> {
    return this.juradoRepository.lineasInvestigacion(id).patch(lineaInvestigacion, where);
  }

  @del('/jurados/{id}/lineas-investigacion', {
    responses: {
      '200': {
        description: 'Jurado.LineaInvestigacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(LineaInvestigacion)) where?: Where<LineaInvestigacion>,
  ): Promise<Count> {
    return this.juradoRepository.lineasInvestigacion(id).delete(where);
  }

  @del('/jurados/{id_jurado}/{id_linea}')
  @response(204, {
    description: 'Relation DELETE success',
  })
  async EliminarLineaDeJurado(
    @param.path.number('id_jurado') id_jurado: number,
    @param.path.number('id_linea') id_linea: number): Promise<Boolean> {
    let registro = await this.juradoLineaInvestigacionRepository.findOne({
      where: {
        id_jurado: id_jurado,
        id_lineaInvestigacion: id_linea
      }
    });
    if (registro) {
      await this.juradoLineaInvestigacionRepository.deleteById(registro.id);
      return true;
    }
    return false;
  }
}
