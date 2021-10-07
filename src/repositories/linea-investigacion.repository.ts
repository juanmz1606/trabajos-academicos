import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {LineaInvestigacion, LineaInvestigacionRelations, Solicitud, Jurado, JuradoLineaInvestigacion} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {JuradoLineaInvestigacionRepository} from './jurado-linea-investigacion.repository';
import {JuradoRepository} from './jurado.repository';

export class LineaInvestigacionRepository extends DefaultCrudRepository<
  LineaInvestigacion,
  typeof LineaInvestigacion.prototype.id,
  LineaInvestigacionRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof LineaInvestigacion.prototype.id>;

  public readonly jurados: HasManyThroughRepositoryFactory<Jurado, typeof Jurado.prototype.id,
          JuradoLineaInvestigacion,
          typeof LineaInvestigacion.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('JuradoLineaInvestigacionRepository') protected juradoLineaInvestigacionRepositoryGetter: Getter<JuradoLineaInvestigacionRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>,
  ) {
    super(LineaInvestigacion, dataSource);
    this.jurados = this.createHasManyThroughRepositoryFactoryFor('jurados', juradoRepositoryGetter, juradoLineaInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('jurados', this.jurados.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
