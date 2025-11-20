import { ISkill } from './ISkills';

export enum Seniority {
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
export interface IJobOfferOnSite extends IJobOfferGeneral {
  jobLocation: JobLocation.ON_SITE;
  province: string;
  city: string;
}
export interface IJobOfferHybrid extends IJobOfferGeneral {
  jobLocation: JobLocation.HYBRID;
  province: string;
  city: string;
}
export interface IJobOfferGeneral {
  title: string;
  company: string;
  description: string;
  skills: Array<ISkill>;
  seniority: Seniority;
  jobLocation: JobLocation;
  shiftTime: ShiftTime;
  salary: number;
}

export interface IJobOfferRemote extends Omit<IJobOfferGeneral, 'jobLocation'> {
  jobLocation: JobLocation.REMOTE;
}

export type IJobOffer = IJobOfferOnSite | IJobOfferHybrid | IJobOfferRemote;
