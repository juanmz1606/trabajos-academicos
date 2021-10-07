import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoVinculacion, TipoVinculacionRelations, Proponente} from '../models';
import {ProponenteRepository} from './proponente.repository';

export class TipoVinculacionRepository extends DefaultCrudRepository<
  TipoVinculacion,
  typeof TipoVinculacion.prototype.id,
  TipoVinculacionRelations
> {

  public readonly proponentes: HasManyRepositoryFactory<Proponente, typeof TipoVinculacion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>,
  ) {
    super(TipoVinculacion, dataSource);
    this.proponentes = this.createHasManyRepositoryFactoryFor('proponentes', proponenteRepositoryGetter,);
    this.registerInclusionResolver('proponentes', this.proponentes.inclusionResolver);
  }
}
