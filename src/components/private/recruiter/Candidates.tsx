import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Avatar, Chip, Divider, Text } from 'react-native-paper';

const candidates: any[] = [
  {
    id: 1,
    name: 'Elena García',
    avatar: 'https://i.pravatar.cc/150?img=1',
    skills: ['SwiftUI', 'UIKit', 'MVVM'],
    status: 'Pendiente',
    statusColor: '#FFF9E6',
    statusTextColor: '#8B7000',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    avatar: 'https://i.pravatar.cc/150?img=3',
    skills: ['Swift', 'Combine', 'Firebase'],
    status: 'Revisado',
    statusColor: '#E3F2FD',
    statusTextColor: '#1565C0',
  },
  {
    id: 3,
    name: 'Sofía Martínez',
    avatar: 'https://i.pravatar.cc/150?img=5',
    skills: ['Swift', 'Core Data', 'TDD'],
    status: 'Entrevista',
    statusColor: '#F3E5F5',
    statusTextColor: '#6A1B9A',
  },
];

const Candidates = () => {
  return (
    <View>
      {candidates.map(
        (
          candidate: {
            id: React.Key | null | undefined;
            avatar: any;
            name:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  unknown,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
            statusColor: any;
            statusTextColor: any;
            status:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  unknown,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
            skills: any[];
          },
          index: number
        ) => {
          return (
            <View key={candidate.id}>
              <View style={styles.candidateCard}>
                <Avatar.Image size={48} source={{ uri: candidate.avatar }} />
                <View style={styles.candidateInfo}>
                  <View style={styles.candidateHeader}>
                    <Text variant='titleSmall' style={styles.candidateName}>
                      {candidate.name}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: candidate.statusColor },
                      ]}
                    >
                      <Text
                        variant='labelSmall'
                        style={[
                          styles.statusText,
                          { color: candidate.statusTextColor },
                        ]}
                      >
                        {candidate.status}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.skillsContainer}>
                    {candidate.skills.map((skill, idx) => (
                      <Chip
                        key={idx}
                        mode='flat'
                        compact
                        style={styles.skillChip}
                        textStyle={styles.skillChipText}
                      >
                        {skill}
                      </Chip>
                    ))}
                  </View>
                </View>
              </View>
              {index < candidates.length - 1 && (
                <Divider style={styles.divider} />
              )}
            </View>
          );
        }
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  jobTitle: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  company: {
    color: '#666',
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
  },
  fullWidthCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  infoLabel: {
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 12,
    color: '#1A1A1A',
  },
  description: {
    color: '#424242',
    lineHeight: 22,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    marginRight: 8,
    color: '#424242',
    fontSize: 16,
  },
  bulletText: {
    flex: 1,
    color: '#424242',
    lineHeight: 22,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#E3F2FD',
  },
  chipText: {
    color: '#1565C0',
    fontSize: 13,
  },
  candidatesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  candidateCard: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  candidateInfo: {
    flex: 1,
    marginLeft: 12,
  },
  candidateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  candidateName: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 11,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillChip: {
    backgroundColor: '#F5F5F5',
    height: 26,
  },
  skillChipText: {
    fontSize: 11,
    color: '#666',
  },
  divider: {
    marginVertical: 4,
  },
  closeButton: {
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 8,
  },
  closeButtonContent: {
    height: 48,
  },
});

export default Candidates;
