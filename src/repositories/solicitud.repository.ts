import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Proponente, SolicitudProponente, Modalidad, TipoSolicitud, EstadoSolicitud, LineaInvestigacion, Comite, ComiteSolicitud, InvitacionEvaluar} from '../models';
import {SolicitudProponenteRepository} from './solicitud-proponente.repository';
import {ProponenteRepository} from './proponente.repository';
import {ModalidadRepository} from './modalidad.repository';
import {TipoSolicitudRepository} from './tipo-solicitud.repository';
import {EstadoSolicitudRepository} from './estado-solicitud.repository';
import {LineaInvestigacionRepository} from './linea-investigacion.repository';
import {ComiteSolicitudRepository} from './comite-solicitud.repository';
import {ComiteRepository} from './comite.repository';
import {InvitacionEvaluarRepository} from './invitacion-evaluar.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly proponentes: HasManyThroughRepositoryFactory<Proponente, typeof Proponente.prototype.id,
          SolicitudProponente,
          typeof Solicitud.prototype.id
        >;

  public readonly tiene_modalidad: BelongsToAccessor<Modalidad, typeof Solicitud.prototype.id>;

  public readonly tiene_tipoSolicitud: BelongsToAccessor<TipoSolicitud, typeof Solicitud.prototype.id>;

  public readonly tiene_estadoSolicitud: BelongsToAccessor<EstadoSolicitud, typeof Solicitud.prototype.id>;

  public readonly tiene_lineaInvestigacion: BelongsToAccessor<LineaInvestigacion, typeof Solicitud.prototype.id>;

  public readonly comites: HasManyThroughRepositoryFactory<Comite, typeof Comite.prototype.id,
          ComiteSolicitud,
          typeof Solicitud.prototype.id
        >;

  public readonly invitacionesEvaluar: HasManyRepositoryFactory<InvitacionEvaluar, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudProponenteRepository') protected solicitudProponenteRepositoryGetter: Getter<SolicitudProponenteRepository>, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>, @repository.getter('ModalidadRepository') protected modalidadRepositoryGetter: Getter<ModalidadRepository>, @repository.getter('TipoSolicitudRepository') protected tipoSolicitudRepositoryGetter: Getter<TipoSolicitudRepository>, @repository.getter('EstadoSolicitudRepository') protected estadoSolicitudRepositoryGetter: Getter<EstadoSolicitudRepository>, @repository.getter('LineaInvestigacionRepository') protected lineaInvestigacionRepositoryGetter: Getter<LineaInvestigacionRepository>, @repository.getter('ComiteSolicitudRepository') protected comiteSolicitudRepositoryGetter: Getter<ComiteSolicitudRepository>, @repository.getter('ComiteRepository') protected comiteRepositoryGetter: Getter<ComiteRepository>, @repository.getter('InvitacionEvaluarRepository') protected invitacionEvaluarRepositoryGetter: Getter<InvitacionEvaluarRepository>,
  ) {
    super(Solicitud, dataSource);
    this.invitacionesEvaluar = this.createHasManyRepositoryFactoryFor('invitacionesEvaluar', invitacionEvaluarRepositoryGetter,);
    this.registerInclusionResolver('invitacionesEvaluar', this.invitacionesEvaluar.inclusionResolver);
    this.comites = this.createHasManyThroughRepositoryFactoryFor('comites', comiteRepositoryGetter, comiteSolicitudRepositoryGetter,);
    this.registerInclusionResolver('comites', this.comites.inclusionResolver);
    this.tiene_lineaInvestigacion = this.createBelongsToAccessorFor('tiene_lineaInvestigacion', lineaInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('tiene_lineaInvestigacion', this.tiene_lineaInvestigacion.inclusionResolver);
    this.tiene_estadoSolicitud = this.createBelongsToAccessorFor('tiene_estadoSolicitud', estadoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_estadoSolicitud', this.tiene_estadoSolicitud.inclusionResolver);
    this.tiene_tipoSolicitud = this.createBelongsToAccessorFor('tiene_tipoSolicitud', tipoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_tipoSolicitud', this.tiene_tipoSolicitud.inclusionResolver);
    this.tiene_modalidad = this.createBelongsToAccessorFor('tiene_modalidad', modalidadRepositoryGetter,);
    this.registerInclusionResolver('tiene_modalidad', this.tiene_modalidad.inclusionResolver);
    this.proponentes = this.createHasManyThroughRepositoryFactoryFor('proponentes', proponenteRepositoryGetter, solicitudProponenteRepositoryGetter,);
    this.registerInclusionResolver('proponentes', this.proponentes.inclusionResolver);
  }
}
