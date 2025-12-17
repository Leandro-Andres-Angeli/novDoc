import React, { useEffect, useState } from 'react';
import { IJobPostingDB, JobOfferStatus } from 'src/types/dbTypes/IJobOffer';
import { getJobPostings } from '../services/jobOffer/jobOffer.service';

const useGetJobPostings = (jobPostingStatus: JobOfferStatus) => {
  const [jobPostings, setJobPostings] = useState<IJobPostingDB[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    error: boolean;
    message: string | null;
  }>({ error: false, message: null });
  const handleGetJobPostings = async (jobPostingStatus: JobOfferStatus) => {
    try {
      setError({ error: false, message: null });
      setLoading(true);
      console.log('trigger');
      const jobPostingPromise = await getJobPostings(jobPostingStatus);
      console.log('PPPP', jobPostingPromise.success);
      if (jobPostingPromise.success) {
        setJobPostings(jobPostingPromise.data);
      }
    } catch (error) {
      setError({ error: true, message: 'Error fetching job postings' });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log('PPP', jobPostingStatus);
    handleGetJobPostings(jobPostingStatus);
  }, [jobPostingStatus]);
  return { jobPostings, loading, error };
};

export default useGetJobPostings;
