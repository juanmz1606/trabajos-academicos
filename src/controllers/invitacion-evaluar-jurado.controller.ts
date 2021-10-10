import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InvitacionEvaluar,
  Jurado,
} from '../models';
import {InvitacionEvaluarRepository} from '../repositories';

export class InvitacionEvaluarJuradoController {
  constructor(
    @repository(InvitacionEvaluarRepository)
    public invitacionEvaluarRepository: InvitacionEvaluarRepository,
  ) { }

  @get('/invitaciones-evaluar/{id}/jurado', {
    responses: {
      '200': {
        description: 'Jurado belonging to InvitacionEvaluar',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurado)},
          },
        },
      },
    },
  })
  async getJurado(
    @param.path.number('id') id: typeof InvitacionEvaluar.prototype.id,
  ): Promise<Jurado> {
    return this.invitacionEvaluarRepository.tiene_jurado(id);
  }
}
