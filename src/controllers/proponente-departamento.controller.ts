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
Proponente,
ProponenteDepartamento,
Departamento,
} from '../models';
import {ArregloDepartamentos} from '../models/arreglo-departamentos.model';
import {ProponenteDepartamentoRepository, ProponenteRepository} from '../repositories';

export class ProponenteDepartamentoController {
  constructor(
    @repository(ProponenteRepository) protected proponenteRepository: ProponenteRepository,
    @repository(ProponenteDepartamentoRepository) protected proponenteDepartamentoRepository: ProponenteDepartamentoRepository,
  ) { }

  @get('/proponentes/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Array of Proponente has many Departamento through ProponenteDepartamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Departamento>,
  ): Promise<Departamento[]> {
    return this.proponenteRepository.departamentos(id).find(filter);
  }

  @post('/proponente-departamento', {
    responses: {
      '200': {
        description: 'create a instance of departamento with a proponente',
        content: {'application/json': {schema: getModelSchemaRef(ProponenteDepartamento)}},
      },
    },
  })
  async createRelation(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProponenteDepartamento, {
            title: 'NewDepartamentoWithProponente',
            exclude: ['id'],
          }),
        },
      },
    }) datos: Omit<ProponenteDepartamento, 'id'>,
  ): Promise<ProponenteDepartamento | null> {
    let registro = await this.proponenteDepartamentoRepository.create(datos);
    return registro;
  }

  @post('/asociar-proponente-departamentos/{id}', {
    responses: {
      '200': {
        description: 'create a instance of departamentos with a proponente',
        content: {'application/json': {schema: getModelSchemaRef(ProponenteDepartamento)}},
      },
    },
  })
  async createRelations(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArregloDepartamentos, {}),
        },
      },
    }) datos: ArregloDepartamentos,
    @param.path.number('id') id_proponente: typeof Proponente.prototype.id
  ): Promise<Boolean> {
    if (datos.departamentos.length > 0) {
      datos.departamentos.forEach(async (id_departamento: number) => {
        let existe = await this.proponenteDepartamentoRepository.findOne({
          where: {
            id_proponente: id_proponente,
            id_departamento: id_departamento
          }
        });
        if (!existe) {
          this.proponenteDepartamentoRepository.create({
            id_proponente: id_proponente,
            id_departamento: id_departamento
          });
        }
      });
      return true
    }
    return false;
  }

  @patch('/proponentes/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Proponente.Departamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {partial: true}),
        },
      },
    })
    departamento: Partial<Departamento>,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.proponenteRepository.departamentos(id).patch(departamento, where);
  }

  @del('/proponentes/{id_proponente}/{id_departamento}')
  @response(204, {
    description: 'Relation DELETE success',
  })
  async EliminarDepartamento(
    @param.path.number('id_proponente') id_proponente: number,
    @param.path.number('id_departamento') id_departamento: number): Promise<Boolean> {
    let registro = await this.proponenteDepartamentoRepository.findOne({
      where: {
        id_proponente: id_proponente,
        id_departamento: id_departamento
      }
    });
    if (registro) {
      await this.proponenteDepartamentoRepository.deleteById(registro.id);
      return true;
    }
    return false;
  }
}
