import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, Departamento, ProponenteDepartamento, TipoVinculacion, Solicitud, SolicitudProponente} from '../models';
import {ProponenteDepartamentoRepository} from './proponente-departamento.repository';
import {DepartamentoRepository} from './departamento.repository';
import {TipoVinculacionRepository} from './tipo-vinculacion.repository';
import {SolicitudProponenteRepository} from './solicitud-proponente.repository';
import {SolicitudRepository} from './solicitud.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly departamentos: HasManyThroughRepositoryFactory<Departamento, typeof Departamento.prototype.id,
          ProponenteDepartamento,
          typeof Proponente.prototype.id
        >;

  public readonly solicitudes: HasManyThroughRepositoryFactory<Solicitud, typeof Solicitud.prototype.id,
          SolicitudProponente,
          typeof Proponente.prototype.id
        >;

  public readonly tiene_tipoVinculacion: BelongsToAccessor<TipoVinculacion, typeof Proponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProponenteDepartamentoRepository') protected proponenteDepartamentoRepositoryGetter: Getter<ProponenteDepartamentoRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('TipoVinculacionRepository') protected tipoVinculacionRepositoryGetter: Getter<TipoVinculacionRepository>, @repository.getter('SolicitudProponenteRepository') protected solicitudProponenteRepositoryGetter: Getter<SolicitudProponenteRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Proponente, dataSource);
    this.tiene_tipoVinculacion = this.createBelongsToAccessorFor('tiene_tipoVinculacion', tipoVinculacionRepositoryGetter,);
    this.registerInclusionResolver('tiene_tipoVinculacion', this.tiene_tipoVinculacion.inclusionResolver);
    this.solicitudes = this.createHasManyThroughRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter, solicitudProponenteRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.departamentos = this.createHasManyThroughRepositoryFactoryFor('departamentos', departamentoRepositoryGetter, proponenteDepartamentoRepositoryGetter,);
    this.registerInclusionResolver('departamentos', this.departamentos.inclusionResolver);
  }
}
