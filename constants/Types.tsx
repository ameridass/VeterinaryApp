export interface Appointment {
  id?: string;
  fecha_hora: string;
  observaciones: string;
  paciente: number;
  empleado: number;
  estado: number;
}

export interface DewormingRecord {
  id?: string;
  fecha: string;
  motivo: string;
  diagnostico: string;
  tratamiento: string;
  paciente: number;
  empleado: number;
  sala: number;
  estado: number;
}

export interface Owner {
  id?: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: number;
}

export const buttonTitles = {
    owner: 'Dueño',
    appointment: 'Cita',
    deworming: 'Desparasitación',
}

export interface Pet {
    id?: string;
    nombre: string;
    especie: string;
    raza: string;
    fecha_nacimiento: string;
    historial_medico: string;
    propietario: number;
    estado: number;
}
