import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Recordatorio, RecordatorioRelations, InvitacionEvaluar} from '../models';
import {InvitacionEvaluarRepository} from './invitacion-evaluar.repository';

export class RecordatorioRepository extends DefaultCrudRepository<
  Recordatorio,
  typeof Recordatorio.prototype.id,
  RecordatorioRelations
> {

  public readonly tiene_invitacionEvaluar: BelongsToAccessor<InvitacionEvaluar, typeof Recordatorio.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('InvitacionEvaluarRepository') protected invitacionEvaluarRepositoryGetter: Getter<InvitacionEvaluarRepository>,
  ) {
    super(Recordatorio, dataSource);
    this.tiene_invitacionEvaluar = this.createBelongsToAccessorFor('tiene_invitacionEvaluar', invitacionEvaluarRepositoryGetter,);
    this.registerInclusionResolver('tiene_invitacionEvaluar', this.tiene_invitacionEvaluar.inclusionResolver);
  }
}
