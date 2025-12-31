import React, { useCallback, useEffect, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { IJobPostingDB, jobPostingStatus } from 'src/types/dbTypes/IJobOffer';
import { getJobPostings } from 'src/services/jobOffer/jobOffer.service';

const useGetJobPostings = (jobPostingStatus: jobPostingStatus) => {
  const [jobPostings, setJobPostings] = useState<IJobPostingDB[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    error: boolean;
    message: string | null;
  }>({ error: false, message: null });

  const handleGetJobPostings = useCallback(async () => {
    try {
      setError({ error: false, message: null });
      setLoading(true);
      const jobPostingPromise = await getJobPostings(jobPostingStatus);
      if (jobPostingPromise.success) {
        setJobPostings(jobPostingPromise.data);
      }
    } catch (err) {
      console.log('errr', err);
      setError({ error: true, message: 'Error fetching job postings' });
    } finally {
      setLoading(false);
    }
  }, [jobPostingStatus]);

  useFocusEffect(
    useCallback(() => {
      console.log('in callback');
      handleGetJobPostings();
    }, [handleGetJobPostings])
  );
  return { jobPostings, loading, error };
};

export default useGetJobPostings;
