export interface ILoginResponse {
  accessToken: string;
  expiresIn: number
}

export interface IResponse<T> {
  data: T;
}

export interface IUser {
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorities?: IAuthority[];
  role?: IRole;
}

export interface IRole {
  id?: number;
  description?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthority {
  authority: string;
}

export interface IFeedBackMessage {
  type?: IFeedbackStatus;
  message?: string;
}

export enum IFeedbackStatus {
  success = "SUCCESS",
  error = "ERROR",
  default = ''
}

export enum IRoleType {
  admin = "ROLE_ADMIN",
  user = "ROLE_USER",
  superAdmin = "ROLE_SUPER_ADMIN_ROLE"
}

export interface IGame {
  id?: number;
  description?: string;
  name?: string;
  imgURL?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}

export interface ICategoria{
  id?: number;
  nombre?: string;
  descripcion?:string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProducto{
  id?: number;
  nombre?: string;
  descripcion?:string;
  cantEnStock?:number;
  createdAt?: string;
  updatedAt?: string;
  categoriaProducto?: ICategoria;
}