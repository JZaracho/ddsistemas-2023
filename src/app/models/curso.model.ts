import { Temas } from '../models/temas.model'

export class Curso {
    id?: number;
    nombre?: string;
    tema?: Temas;
    fechaInicio?: any;
    idDocente?: number;
}
