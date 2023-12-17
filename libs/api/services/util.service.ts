import {Injectable} from "@angular/core";
import {apiAddress, localAddress} from "../env-variable";

@Injectable()
export class UtilService {
  private baseURL = `${apiAddress}/api/user`
  private localURL = `${localAddress}`

  openNewTabByPath(path: string): void {
    window.open(`${this.localURL}/${path}`, '_blank');
  }
}
