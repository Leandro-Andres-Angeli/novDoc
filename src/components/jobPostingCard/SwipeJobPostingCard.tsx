import { View, FlatList, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';
import {
  Card,
  Chip,
  Icon,
  IconButton,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import { ContentWrapper } from '../../screens/public/SignInScreen';
import { CustomTheme } from 'src/providers/PublicProviders';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { ISkill, skillsLists } from '../../types/dbTypes/ISkills';
import { isProfessional, isRecruiter } from '@utils/checkUserType';
import currencyFormatter from '@utils/currencyFormatter';

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
    <Surface style={styles.container} elevation={0}>
      <Card
        style={{
          ...styles.card,
          backgroundColor: theme.colors.background,
          width: '70%',
        }}
      >
        <Card.Content>
          {/* Job Title */}
          <Text variant='headlineSmall' style={styles.jobTitle}>
            {jobPosting.title}
          </Text>

          {/* Company Name */}
          <Text variant='bodyMedium' style={styles.companyName}>
            {jobPosting.company}
          </Text>

          {/* Job Description */}
          <Text variant='bodyMedium' style={styles.description}>
            {jobPosting.description}
            {/* Buscamos a un experto en React para desarrollar nuestras plataformas digitales de próxima generación. Trabajarás en un... */}
          </Text>

          {/* Skills Section */}
          <Text variant='labelSmall' style={styles.skillsLabel}>
            TUS SKILLS COINCIDEN
          </Text>
          <FlatList
            style={styles.skillsContainer}
            horizontal={true}
            renderItem={({ item }) => (
              <Chip
                mode='outlined'
                style={styles.skillChip}
                icon='check'
                textStyle={{
                  ...styles.skillText,
                  color: theme.colors.primary,
                  textTransform: 'capitalize',
                  flexShrink: 1,
                }}
              >
                {item.name}{' '}
              </Chip>
            )}
            keyExtractor={(item) => item.name}
            data={jobPostingSkillsThatMatchesUser(
              user.skills.map((el) => el.name),
            )}
          ></FlatList>
          {/* <View style={styles.skillsContainer}>
            <Chip
              mode="outlined"
              style={styles.skillChip}
              textStyle={styles.skillText}
              icon="check"
            >
              React
            </Chip>
            <Chip
              mode="outlined"
              style={styles.skillChip}
              textStyle={styles.skillText}
              icon="check"
            >
              TypeScript
            </Chip>
            <Chip
              mode="outlined"
              style={styles.skillChip}
              textStyle={styles.skillText}
              icon="check"
            >
              Node.js
            </Chip>
          </View> */}

          {/* Additional Info */}
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Icon source='briefcase-outline' size={16} color='#666' />
              <Text variant='bodySmall' style={styles.infoText}>
                +2 años
              </Text>
            </View>
          </View>

          {/* Salary and Location */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Icon source='cash' size={18} color='#333' />
              <Text variant='bodyMedium' style={styles.detailText}>
                {currencyFormatter().format(jobPosting.salary)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Icon source='map-marker-outline' size={18} color='#333' />
              <Text variant='bodyMedium' style={styles.detailText}>
                {jobPosting.jobLocation}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Surface
          style={[styles.actionButton, styles.rejectButton]}
          elevation={1}
        >
          <IconButton
            icon='close'
            iconColor='#FF4458'
            size={28}
            onPress={() => console.log('Reject')}
          />
        </Surface>

        <Surface style={[styles.actionButton, styles.likeButton]} elevation={2}>
          <IconButton
            icon='heart'
            iconColor='#FFFFFF'
            size={32}
            onPress={() => console.log('Like')}
          />
        </Surface>

        <Surface style={[styles.actionButton, styles.starButton]} elevation={1}>
          <IconButton
            icon='star'
            iconColor='#FFA726'
            size={28}
            onPress={() => console.log('Star')}
          />
        </Surface>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '100%',

    padding: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#37474F',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  jobTitle: {
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  companyName: {
    color: '#5C6BC0',
    fontWeight: '500',
    marginBottom: 12,
  },
  description: {
    color: '#666666',
    lineHeight: 22,
    marginBottom: 16,
  },
  skillsLabel: {
    color: '#9E9E9E',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  skillChip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    height: 32,
  },
  skillText: {
    fontSize: 13,
    color: '#333333',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    color: '#666666',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    color: '#333333',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },
  rejectButton: {
    width: 56,
    height: 56,
  },
  likeButton: {
    width: 64,
    height: 64,
    backgroundColor: '#5C6BC0',
  },
  starButton: {
    width: 56,
    height: 56,
  },
});

export default SwipeJobPostingCard;
