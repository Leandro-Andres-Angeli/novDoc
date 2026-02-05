import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
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
import AppSwipeActions from '../shared/AppSwipeActions';
import Animated, { FadeInDown } from 'react-native-reanimated';
import utilityStyles from 'src/styles/utilityStyles';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
    <ScrollView>
      <Surface
        style={{
          ...styles.container,

          overflow: 'scroll',
          minHeight: '100%',
        }}
        elevation={0}
      >
        <Card
          style={{
            ...styles.card,
            backgroundColor: theme.colors.background,
            width: '100%',

            overflow: 'scroll',
            height: '95%',
          }}
        >
          <Card.Content>
            {/* Job Title */}
            <Text
              variant='headlineSmall'
              style={{ ...styles.jobTitle, textTransform: 'capitalize' }}
            >
              {jobPosting.title}
            </Text>

            {/* Company Name */}
            <Text
              variant='bodyMedium'
              style={{
                ...styles.companyName,
                color: theme.colors.primary,
                textTransform: 'capitalize',
              }}
            >
              {jobPosting.company}
            </Text>

            {/* Job Description */}
            <Text variant='bodyMedium' style={styles.description}>
              {jobPosting.description}
              {/* Buscamos a un experto en React para desarrollar nuestras plataformas digitales de próxima generación. Trabajarás en un... */}
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              maxime natus fugiat ad! Quidem dolorum voluptate dignissimos,
              eaque quo, incidunt voluptas tempore at optio laborum ipsam
              cupiditate, ullam vel corrupti possimus est velit quis nam
              accusantium suscipit debitis enim sed. Quo odit fugiat a debitis
              veritatis nesciunt exercitationem dolor aspernatur! Distinctio
              quibusdam error sint, magnam beatae, atque blanditiis eaque quidem
              provident non explicabo nesciunt rem ipsa hic dolorem tempore
              necessitatibus facere quo voluptatibus veniam reiciendis ipsam
              earum? Tenetur soluta inventore error placeat eos animi sequi quis
              consectetur cum? Aspernatur, quasi libero odit odio officiis ullam
              minus earum, magni pariatur sit reiciendis atque quam rem?
              Doloribus asperiores consectetur omnis temporibus exercitationem
              facilis voluptatibus repellendus eveniet est aut. Facere, magnam
              illo veniam numquam natus repudiandae ea. Nisi ipsa doloremque
              autem neque fugiat reprehenderit quae, placeat molestiae, dolore
              atque temporibus id! Magnam pariatur, tempore culpa repudiandae,
              corrupti temporibus officia asperiores, rerum debitis voluptates
              fugiat. Eum, deleniti ad? Voluptas, ab modi commodi, quaerat,
              inventore nihil harum vero cum doloremque perferendis sequi
              tempora? Porro sint dolorum ea inventore est, quas tempore dolor
              magnam. Necessitatibus iste, reiciendis amet quos expedita nam
              voluptate, molestias consequuntur eos minus non facilis, esse
              laboriosam repellat veniam dolorum vitae vero ex delectus
              recusandae rerum officia? Blanditiis vero tenetur repudiandae
              quibusdam et sint, illo amet facilis maiores odit iste eligendi
              molestias quam delectus dolores commodi voluptate inventore? Alias
              necessitatibus assumenda quos error, illum perspiciatis provident,
              tenetur modi perferendis enim repudiandae non rerum dolor
              suscipit, saepe repellendus eius dolore cumque possimus. Modi
              corporis doloremque ea sequi tempora corrupti accusantium. Non
              inventore laboriosam repellat a voluptatum officia vero ipsam
              exercitationem ratione quasi error at ea quos delectus deserunt
              voluptate iste, facere impedit temporibus nam cupiditate sit
              sequi! Fugiat ea nobis dolorem ut soluta odit sunt vitae, modi
              facere cum ullam error quo, perferendis illum quis, expedita
              doloremque animi sed. Quas expedita porro exercitationem, harum
              doloribus totam quidem quo. Blanditiis perferendis voluptate quo
              sint suscipit, quibusdam tempore quisquam incidunt ducimus placeat
              dicta nostrum illum mollitia amet asperiores voluptates
              exercitationem consectetur sapiente in quam obcaecati molestiae
              nobis quidem. Nostrum laudantium inventore, saepe sit vitae ipsa
              id quibusdam rerum ipsam, possimus minima fugiat itaque laborum.
              Quos fugit et voluptates qui, quasi, ipsa nulla impedit dolorem
              vel fuga a in perspiciatis sint delectus? Facilis beatae soluta
              earum, excepturi enim qui ut illo obcaecati tenetur quisquam,
              reprehenderit natus, mollitia sit eius animi culpa voluptas
              voluptate ullam est totam consequuntur nesciunt eligendi
              voluptatem dolor! Explicabo odio dolore magnam labore in
              distinctio ipsum, aliquam porro repellat tenetur inventore
              molestiae culpa illum laborum sed, earum animi voluptatum nam?
              Deserunt dolorum veritatis aut labore et, accusamus rem sequi iste
              quos molestiae illo molestias tempora ipsum eligendi voluptates
              quidem consequatur sit dolorem esse, repellendus, ut excepturi
              aspernatur explicabo provident. Recusandae officia totam,
              consequuntur fugiat, adipisci quod nostrum repellat dolorem
              accusamus fugit animi sed. Sequi eius deserunt consequatur cum
              minima facere incidunt saepe ipsam, sit doloremque deleniti
              voluptatum, provident dolore, modi accusamus necessitatibus. Quae
              voluptas exercitationem voluptates necessitatibus aperiam tempore
              dolor iure sapiente fuga quas!
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
                <Text variant='bodyMedium' style={{ ...styles.detailText }}>
                  {currencyFormatter().format(jobPosting.salary)}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Icon source='map-marker-outline' size={18} color='#333' />
                <Text
                  variant='bodyMedium'
                  style={{ ...styles.detailText, textTransform: 'capitalize' }}
                >
                  {jobPosting.jobLocation}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </Surface>
    </ScrollView>
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
});

export default SwipeJobPostingCard;
