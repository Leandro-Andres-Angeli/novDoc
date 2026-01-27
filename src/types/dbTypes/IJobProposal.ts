import { Timestamp } from 'firebase/firestore';

export enum IJobApplicationStatus {
  APPLIED = 'postulado',
  VIEWED = 'visto',
  MATCH = 'match',
  REJECTED = 'no match',
}
export interface IJobApplications {
  status: IJobApplicationStatus;
  candidateId: string;
  jobId: string;
  recruiterId: string;
  appliedAt: Timestamp;
  statusUpdatedAt: Timestamp;
}
