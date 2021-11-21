import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {NotificacionCorreo} from '../models';
import {Keys} from '../config/keys';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  EnviarCorreo(datos: NotificacionCorreo){
    let url = `${Keys.urlCorreo}?${Keys.destinoArg}=${datos.destinatario}&${Keys.asuntoArg}=${datos.asunto}&${Keys.mensajeArg}=${datos.mensaje}&${Keys.hashArg}=${Keys.hashNotificacion}&${Keys.hashInvitacionArg}=${datos.hash}`;
    fetch(url)
    .then((res:any) => {
      console.log(res.text());
    })
  }
}
