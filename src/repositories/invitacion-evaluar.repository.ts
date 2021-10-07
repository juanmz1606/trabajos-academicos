import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {InvitacionEvaluar, InvitacionEvaluarRelations, Solicitud, Jurado, ResultadoEvaluacion, Recordatorio} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {JuradoRepository} from './jurado.repository';
import {ResultadoEvaluacionRepository} from './resultado-evaluacion.repository';
import {RecordatorioRepository} from './recordatorio.repository';

export class InvitacionEvaluarRepository extends DefaultCrudRepository<
  InvitacionEvaluar,
  typeof InvitacionEvaluar.prototype.id,
  InvitacionEvaluarRelations
> {

  public readonly tiene_solicitud: BelongsToAccessor<Solicitud, typeof InvitacionEvaluar.prototype.id>;

  public readonly tiene_jurado: BelongsToAccessor<Jurado, typeof InvitacionEvaluar.prototype.id>;

  public readonly resultadosEvaluacion: HasManyRepositoryFactory<ResultadoEvaluacion, typeof InvitacionEvaluar.prototype.id>;

  public readonly recordatorios: HasManyRepositoryFactory<Recordatorio, typeof InvitacionEvaluar.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>, @repository.getter('ResultadoEvaluacionRepository') protected resultadoEvaluacionRepositoryGetter: Getter<ResultadoEvaluacionRepository>, @repository.getter('RecordatorioRepository') protected recordatorioRepositoryGetter: Getter<RecordatorioRepository>,
  ) {
    super(InvitacionEvaluar, dataSource);
    this.recordatorios = this.createHasManyRepositoryFactoryFor('recordatorios', recordatorioRepositoryGetter,);
    this.registerInclusionResolver('recordatorios', this.recordatorios.inclusionResolver);
    this.resultadosEvaluacion = this.createHasManyRepositoryFactoryFor('resultadosEvaluacion', resultadoEvaluacionRepositoryGetter,);
    this.registerInclusionResolver('resultadosEvaluacion', this.resultadosEvaluacion.inclusionResolver);
    this.tiene_jurado = this.createBelongsToAccessorFor('tiene_jurado', juradoRepositoryGetter,);
    this.registerInclusionResolver('tiene_jurado', this.tiene_jurado.inclusionResolver);
    this.tiene_solicitud = this.createBelongsToAccessorFor('tiene_solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_solicitud', this.tiene_solicitud.inclusionResolver);
  }
}
