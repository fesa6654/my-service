import { Socket } from "net"
import { v4 as uuidv4 } from "uuid"
import { Client } from "./client"
import { ServerOptions } from "./src/data/types"


export class MyHTTPService {

  private clients: Record<string, Client> = {}
  public serverHandler: Function

  constructor() {
    var that = this
    var client_options = {
      client_id: ''
    } as ServerOptions

    this.serverHandler = function serverHandler(client: Socket): void {
      client_options.client_id = uuidv4()
      const client_class = new Client(that, client, client_options)
      that.clients[client_options.client_id] = client_class
    }
  }

  deleteClientClass(client_id: string): void {
    delete this.clients[client_id]
  }

}