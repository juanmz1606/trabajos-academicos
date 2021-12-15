import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors, param, post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Keys as llaves} from '../config/keys';
import {ProponenteRepository, TipoSolicitudRepository, SolicitudRepository} from '../repositories';

authenticate("admin")
export class CargarArchivosController {
  constructor(
    @repository(ProponenteRepository)
    private ProponenteRepository: ProponenteRepository,
    @repository(TipoSolicitudRepository)
    private TipoSolicitudRepository: TipoSolicitudRepository,
    @repository(SolicitudRepository)
    private SolicitudRepository: SolicitudRepository
  ) { }

  /**
 *
 * @param response
 * @param request
 */
  @post('/CargarFotografiaProponente', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la fotografia de un proponente.',
      },
    },
  })
  async cargarFotografiaProponente(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request
  ): Promise<object | false> {
    const rutaFotografia = path.join(__dirname, llaves.carpetaFotografia);
    let res = await this.StoreFileToPath(rutaFotografia, llaves.nombreCampoFotografia, request, response, llaves.extensionesPermitidasIMG);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarFotografia/{id_proponente}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la fotografia de un proponente.',
      },
    },
  })
  async cargarFotografia(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number("id_proponente") id_proponente: number
  ): Promise<object | false> {
    const rutaFotografia = path.join(__dirname, llaves.carpetaFotografia);
    let res = await this.StoreFileToPath(rutaFotografia, llaves.nombreCampoFotografia, request, response, llaves.extensionesPermitidasIMG);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let proponente = await this.ProponenteRepository.findOne({
          where: {
            id: id_proponente
          }
        });
        if (proponente) {
          proponente.fotografia = nombre_archivo;
          await this.ProponenteRepository.update(proponente);
          return {filename: nombre_archivo};
        }
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarFormatoTipoSolicitud/{id_tipoSolicitud}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de archivo de un tipo de solicitud.',
      },
    },
  })
  async CargarFormatoTipoSolicitud(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number("id_tipoSolicitud") id_tipoSolicitud: number
  ): Promise<object | false> {
    const rutaFormatoTipoSolicitud = path.join(__dirname, llaves.carpetaArchivoTrabajo);
    let res = await this.StoreFileToPath(rutaFormatoTipoSolicitud, llaves.nombreCampoArchivoTrabajo, request, response, llaves.extensionesPermitidasDOC);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let tipoSolicitud = await this.TipoSolicitudRepository.findOne({
          where: {
            id: id_tipoSolicitud
          }
        });
        if (tipoSolicitud) {
          tipoSolicitud.formato = nombre_archivo;
          await this.TipoSolicitudRepository.update(tipoSolicitud);
          return {filename: nombre_archivo};
        }
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   */
   @post('/CargarFormatoTipoSolicitud', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de archivo de un tipo de solicitud.',
      },
    },
  })
  async CargarFormatoTrabajoTipoSolicitud(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request
  ): Promise<object | false> {
    const rutaFormatoTipoSolicitud = path.join(__dirname, llaves.carpetaArchivoTrabajo);
    let res = await this.StoreFileToPath(rutaFormatoTipoSolicitud, llaves.nombreCampoArchivoTrabajo, request, response, llaves.extensionesPermitidasDOC);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   */
   @post('/CargarArchivoSolicitud', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de archivo de una solicitud.',
      },
    },
  })
  async CargarTrabajoSolicitud(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request
  ): Promise<object | false> {
    const rutaCargarArchivoSolicitud = path.join(__dirname, llaves.carpetaArchivoTrabajo);
    let res = await this.StoreFileToPath(rutaCargarArchivoSolicitud, llaves.nombreCampoArchivoTrabajo, request, response, llaves.extensionesPermitidasDOC);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarArchivoSolicitud/{id_solicitud}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de archivo de una solicitud.',
      },
    },
  })
  async CargarArchivoSolicitud(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number("id_solicitud") id_solicitud: number
  ): Promise<object | false> {
    const rutaCargarArchivoSolicitud = path.join(__dirname, llaves.carpetaArchivoTrabajo);
    let res = await this.StoreFileToPath(rutaCargarArchivoSolicitud, llaves.nombreCampoArchivoTrabajo, request, response, llaves.extensionesPermitidasDOC);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let solicitud = await this.SolicitudRepository.findOne({
          where: {
            id: id_solicitud
          }
        });
        if (solicitud) {
          solicitud.archivo = nombre_archivo;
          await this.SolicitudRepository.update(solicitud);
          return {filename: nombre_archivo};
        }
      }
    }
    return res;
  }


  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path)
      },
      filename: function (req: any, file: any, cb: any) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('El formato del archivo no es permitido.'));
        },
        limits: {
          fileSize: llaves.tamMax
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }



}
