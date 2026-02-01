import { View, FlatList } from 'react-native';
import React, { useContext } from 'react';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';
import { Card, Chip, Text, useTheme } from 'react-native-paper';
import { ContentWrapper } from '../../screens/public/SignInScreen';
import { CustomTheme } from 'src/providers/PublicProviders';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { ISkill, skillsLists } from '../../types/dbTypes/ISkills';
import { isProfessional, isRecruiter } from '@utils/checkUserType';

interface SwipeJobPostingCardProps {
  jobPosting: IJobPostingDB;
}
const SwipeJobPostingCard = ({ jobPosting }: SwipeJobPostingCardProps) => {
  const theme = useTheme<CustomTheme>();
  const {
    authState: { user },
  } = useContext(AuthContext);
  if (!user) {
    throw Error('User not found ');
    return <></>;
  }
  if (isRecruiter(user)) {
    throw Error('Wrong kind of user');
    return <></>;
  }
  function jobPostingSkillsThatMatchesUser(userSkillsNames: Array<string>) {
    return jobPosting.skills.filter((el) => userSkillsNames.includes(el.name));
  }
  return (
    <Card style={{ backgroundColor: theme.colors.background }}>
      <Card.Title
        title={jobPosting.title}
        subtitle={jobPosting.company}
        titleVariant='titleLarge'
      ></Card.Title>

      <Card.Content>
        <Text variant='labelMedium' style={{ textTransform: 'uppercase' }}>
          tus skills coinciden
        </Text>
        <FlatList
          horizontal={true}
          scrollEnabled={true}
          renderItem={({ item }) => <Chip>{item.name}</Chip>}
          keyExtractor={(item) => item.name}
          data={jobPostingSkillsThatMatchesUser(
            user.skills.map((el) => el.name),
          )}
        ></FlatList>
        <Text>
          {new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
          }).format(jobPosting.salary)}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default SwipeJobPostingCard;
