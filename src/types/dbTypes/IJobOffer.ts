export enum Senority {
  JUNIOR = 'junior',
  MID_LEVEL = 'mid-level',
  SENIOR = 'senior',
}
export enum JobLocation {
  REMOTE = 'remoto',
  ON_SITE = 'presencial',
  HYBRID = 'hibrido',
}
// export type JobLocation = 'remoto' | 'presencial' | 'hibrido';
export enum ShiftTime {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACTOR = 'contractor',
}

export interface IJobOffer {
  title: string;
  description: string;
  skills: Array<string>;
  senority: Senority;
  jobLocation: JobLocation;
  shiftTime: ShiftTime;
  salary: number;
}
