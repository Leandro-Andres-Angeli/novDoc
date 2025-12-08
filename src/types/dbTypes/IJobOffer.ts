import { Timestamp } from 'firebase/firestore';
import { ISkill } from './ISkills';
export type MapLocation = {
  id: string;
  nombre: string;
};
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
export enum JobOfferStatus {
  ACTIVE = 'activa',
  CLOSED = 'cerrada',
  PAUSED = 'pausada',
}
export interface IJobOfferOnSite extends IJobOfferGeneral {
  jobLocation: JobLocation.ON_SITE;
  province: MapLocation;
  city: MapLocation;
}
export interface IJobOfferHybrid extends IJobOfferGeneral {
  jobLocation: JobLocation.HYBRID;
  province: MapLocation;
  city: MapLocation;
}
export type IJobPostingDB = IJobOffer & { id: string };
export interface IJobOfferGeneral {
  title: string;
  company: string;
  recruiter_id: string;
  description: string;
  skills: Array<ISkill>;
  seniority: Seniority;
  jobLocation: JobLocation;
  shiftTime: ShiftTime;
  salary: number;
  status: JobOfferStatus;
  createdAt: Timestamp;
}

export interface IJobOfferRemote extends Omit<IJobOfferGeneral, 'jobLocation'> {
  jobLocation: JobLocation.REMOTE;
}

export type IJobOffer = IJobOfferOnSite | IJobOfferHybrid | IJobOfferRemote;
