import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, LineaInvestigacion, JuradoLineaInvestigacion, InvitacionEvaluar} from '../models';
import {JuradoLineaInvestigacionRepository} from './jurado-linea-investigacion.repository';
import {LineaInvestigacionRepository} from './linea-investigacion.repository';
import {InvitacionEvaluarRepository} from './invitacion-evaluar.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {

  public readonly lineasInvestigacion: HasManyThroughRepositoryFactory<LineaInvestigacion, typeof LineaInvestigacion.prototype.id,
          JuradoLineaInvestigacion,
          typeof Jurado.prototype.id
        >;

  public readonly invitacionesEvaluar: HasManyRepositoryFactory<InvitacionEvaluar, typeof Jurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoLineaInvestigacionRepository') protected juradoLineaInvestigacionRepositoryGetter: Getter<JuradoLineaInvestigacionRepository>, @repository.getter('LineaInvestigacionRepository') protected lineaInvestigacionRepositoryGetter: Getter<LineaInvestigacionRepository>, @repository.getter('InvitacionEvaluarRepository') protected invitacionEvaluarRepositoryGetter: Getter<InvitacionEvaluarRepository>,
  ) {
    super(Jurado, dataSource);
    this.invitacionesEvaluar = this.createHasManyRepositoryFactoryFor('invitacionesEvaluar', invitacionEvaluarRepositoryGetter,);
    this.registerInclusionResolver('invitacionesEvaluar', this.invitacionesEvaluar.inclusionResolver);
    this.lineasInvestigacion = this.createHasManyThroughRepositoryFactoryFor('lineasInvestigacion', lineaInvestigacionRepositoryGetter, juradoLineaInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('lineasInvestigacion', this.lineasInvestigacion.inclusionResolver);
  }
}
