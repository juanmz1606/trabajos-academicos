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
Proponente,
ProponenteDepartamento,
Departamento,
} from '../models';
import {ProponenteRepository} from '../repositories';

export class ProponenteDepartamentoController {
  constructor(
    @repository(ProponenteRepository) protected proponenteRepository: ProponenteRepository,
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

  @post('/proponentes/{id}/departamentos', {
    responses: {
      '200': {
        description: 'create a Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Proponente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {
            title: 'NewDepartamentoInProponente',
            exclude: ['id'],
          }),
        },
      },
    }) departamento: Omit<Departamento, 'id'>,
  ): Promise<Departamento> {
    return this.proponenteRepository.departamentos(id).create(departamento);
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

  @del('/proponentes/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Proponente.Departamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.proponenteRepository.departamentos(id).delete(where);
  }
}
