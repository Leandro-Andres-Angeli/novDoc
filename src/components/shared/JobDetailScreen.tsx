import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import {
  Appbar,
  Text,
  Chip,
  Avatar,
  Button,
  Divider,
} from 'react-native-paper';
import { ChevronLeft, Edit, Filter } from 'lucide-react-native';

const candidates = [
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

const requirements = [
  'Swift',
  'SwiftUI',
  'UIKit',
  'Core Data',
  'REST APIs',
  'Git',
];

export default function JobDetailsScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header elevated style={styles.header}>
        <Appbar.Action
          icon={() => <ChevronLeft size={24} color='#000' />}
          onPress={() => console.log('Back')}
        />
        <Appbar.Content
          title='Detalles de Oferta'
          titleStyle={styles.headerTitle}
        />
        <Appbar.Action
          icon={() => <Edit size={20} color='#000' />}
          onPress={() => console.log('Edit')}
        />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {/* Job Title Section */}
        <View style={styles.section}>
          <Text variant='headlineSmall' style={styles.jobTitle}>
            Desarrollador Senior iOS
          </Text>
          <Text variant='bodyMedium' style={styles.company}>
            Tech Solutions Inc. - Remoto, España
          </Text>
        </View>

        {/* Job Info Cards */}
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text variant='bodySmall' style={styles.infoLabel}>
              Rango Salarial
            </Text>
            <Text variant='titleMedium' style={styles.infoValue}>
              €55k - €70k
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text variant='bodySmall' style={styles.infoLabel}>
              Tipo de Empleo
            </Text>
            <Text variant='titleMedium' style={styles.infoValue}>
              Jornada Completa
            </Text>
          </View>
        </View>

        <View style={[styles.infoCard, styles.fullWidthCard]}>
          <Text variant='bodySmall' style={styles.infoLabel}>
            Fecha Límite
          </Text>
          <Text variant='titleMedium' style={styles.infoValue}>
            31 de Diciembre, 2024
          </Text>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text variant='titleMedium' style={styles.sectionTitle}>
            Descripción del Puesto
          </Text>
          <Text variant='bodyMedium' style={styles.description}>
            Estamos buscando un Desarrollador Senior iOS experimentado para
            unirse a nuestro equipo. El candidato ideal tiene una gran pasión
            por la tecnología móvil y un historial comprobado de creación de
            aplicaciones iOS de alta calidad.
          </Text>
        </View>

        {/* Responsibilities Section */}
        <View style={styles.section}>
          <Text variant='titleMedium' style={styles.sectionTitle}>
            Responsabilidades
          </Text>
          {[
            'Diseñar y construir aplicaciones avanzadas para la plataforma iOS.',
            'Colaborar con equipos multifuncionales para definir y diseñar nuevas funciones.',
            'Realizar pruebas unitarias para garantizar la robustez y fiabilidad del código.',
            'Corregir errores y mejorar el rendimiento de la aplicación.',
          ].map((item, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text variant='bodyMedium' style={styles.bulletText}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* Requirements Section */}
        <View style={styles.section}>
          <Text variant='titleMedium' style={styles.sectionTitle}>
            Requisitos
          </Text>
          <View style={styles.chipsContainer}>
            {requirements.map((req, index) => (
              <Chip
                key={index}
                mode='flat'
                style={styles.chip}
                textStyle={styles.chipText}
              >
                {req}
              </Chip>
            ))}
          </View>
        </View>

        {/* Candidates Section */}
        <View style={styles.section}>
          <View style={styles.candidatesHeader}>
            <Text variant='titleMedium' style={styles.sectionTitle}>
              Candidatos Interesados
            </Text>
            <Button
              mode='text'
              icon={() => <Filter size={16} color='#666' />}
              onPress={() => console.log('Filter')}
              compact
              textColor='#666'
            >
              Filtrar
            </Button>
          </View>

          {candidates.map((candidate, index) => (
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
          ))}
        </View>

        {/* Close Button */}
        <Button
          mode='contained'
          onPress={() => console.log('Close offer')}
          style={styles.closeButton}
          buttonColor='#FFE5E5'
          textColor='#C62828'
          contentStyle={styles.closeButtonContent}
        >
          Cerrar Oferta
        </Button>
      </ScrollView>
    </View>
  );
}

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
