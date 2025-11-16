import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, ProgressBar } from 'react-native-paper';
import { colors } from '../lib/theme';

export function TrackScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Track Progress</Title>
        <Paragraph style={styles.subtitle}>Monitor your nutrition journey</Paragraph>
      </View>

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Title style={styles.cardTitle}>Start Tracking</Title>
          <Paragraph style={styles.cardText}>
            Complete meals and provide feedback to see your progress and insights.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <Title style={styles.cardTitle}>What You'll Track</Title>

          <View style={styles.trackingItem}>
            <Paragraph style={styles.trackingLabel}>Meal Completion</Paragraph>
            <ProgressBar progress={0} color={colors.vibrantLime} style={styles.progressBar} />
            <Paragraph style={styles.trackingValue}>0%</Paragraph>
          </View>

          <View style={styles.trackingItem}>
            <Paragraph style={styles.trackingLabel}>Nutrition Goals</Paragraph>
            <ProgressBar progress={0} color={colors.oceanBlue} style={styles.progressBar} />
            <Paragraph style={styles.trackingValue}>0%</Paragraph>
          </View>

          <View style={styles.trackingItem}>
            <Paragraph style={styles.trackingLabel}>Top 15 Foods</Paragraph>
            <ProgressBar progress={0} color={colors.deepForestGreen} style={styles.progressBar} />
            <Paragraph style={styles.trackingValue}>0%</Paragraph>
          </View>

          <View style={styles.trackingItem}>
            <Paragraph style={styles.trackingLabel}>Family Satisfaction</Paragraph>
            <ProgressBar progress={0} color={colors.berryPurple} style={styles.progressBar} />
            <Paragraph style={styles.trackingValue}>No ratings yet</Paragraph>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pureWhite,
  },
  header: {
    padding: 20,
    backgroundColor: colors.softBeige,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.deepForestGreen,
  },
  subtitle: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 4,
  },
  card: {
    margin: 16,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.deepForestGreen,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 12,
  },
  trackingItem: {
    marginVertical: 12,
  },
  trackingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.offBlack,
    marginBottom: 6,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lightGray,
  },
  trackingValue: {
    fontSize: 12,
    color: colors.darkGray,
    marginTop: 4,
    textAlign: 'right',
  },
});
