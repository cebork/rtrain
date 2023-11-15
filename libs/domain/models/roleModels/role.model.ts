export interface IRoleModel {
  id?: string;
  name?: string;
}

export class RoleModel implements IRoleModel {
  id?: string;
  name?: string;


  constructor(id?: string, name?: string) {
    this.id = id;
    this.name = name;
  }
}
