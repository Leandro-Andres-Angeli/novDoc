import { View, Text, FlatList } from 'react-native';
import React, { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { Role } from 'src/types/authContextTypes/userRole';
import AppLoading from '@ui/AppLoading';
import NoSkillsOnProfile from '@components/private/professional/NoSkillsOnProfile';
import NoResultsForSkills from '@components/private/professional/NoResultsForSkills';
import { ProfessionalContext } from 'src/appContext/professionalContext/ProfessionalContext';
import { jobPostingStatus } from 'src/types/dbTypes/IJobOffer';

import { Card } from 'react-native-paper';

const SwipeProfessional = () => {
  const {
    authState: { user },
    loading: authLoading,
  } = useContext(AuthContext);

  const {
    loadJobPostings,
    loading: loadingJobPostings,
    jobPostings,
    error,
    hasMore,
  } = useContext(ProfessionalContext);
  if (authLoading) {
    return <AppLoading></AppLoading>;
  }

  if (user?.role !== Role.PROFESSIONAL) {
    throw Error('Wrong kind of user');
    return <></>;
  }

  if (!user.skills || user.skills.length === 0) {
    return <NoSkillsOnProfile></NoSkillsOnProfile>;
  }
  // console.log(JSON.stringify(loadingJobPostings));
  // console.log('jobps', jobPostings);

  const handleLoadJobPostingsForSkills = useCallback(() => {
    console.log('firing use callback');
    return loadJobPostings(false, true);
  }, [user.skills]);

  useEffect(() => {
    console.log('INSIDE USE EFFECTTTT');
    // handleLoadJobPostingsForSkills();
    handleLoadJobPostingsForSkills();
  }, [user.skills]);
  // if (jobPostings.length === 0) {
  //   return <NoResultsForSkills></NoResultsForSkills>;
  // }
  return (
    <View>
      <Text>SwipeProfessional</Text>
      <Text>LENGTH {jobPostings.length}</Text>
      <Text>user skills {JSON.stringify(user.skills)}</Text>
      <Text>{JSON.stringify(loadingJobPostings)}</Text>
      <Text>{JSON.stringify(jobPostings)}</Text>
      {/* <Card >
               <CardContent>
                 <View key={p.id}>
          <Text> {p.title}</Text>
          <Text>Skills </Text>
          {p.skills.map((el) => (
            <Text key={el.name}>{el.name}</Text>
          ))}
               </CardContent>
          </Card> */}
      {/* <FlatList
        data={jobPostings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Card>
              <Card.Title title={item.title}> </Card.Title>
              <Text>Skills </Text>
              {item.skills.map((el) => (
                <Text key={el.name}>{el.name}</Text>
              ))}
            </Card>
          );
        }}
      /> */}
    </View>
  );
};

export default SwipeProfessional;
