import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Button } from 'react-native-paper';
import { colors } from '../lib/theme';

export function PlanScreen() {
  const getCurrentWeek = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${monday.toLocaleDateString('en-US', options)} - ${sunday.toLocaleDateString('en-US', options)}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Meal Plan</Title>
        <Paragraph style={styles.subtitle}>Week of {getCurrentWeek()}</Paragraph>
      </View>

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Title style={styles.cardTitle}>No Meal Plan Yet</Title>
          <Paragraph style={styles.cardText}>
            Complete the weekly questionnaire to generate your personalized meal plan.
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained">Start Questionnaire</Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <Title style={styles.cardTitle}>How It Works</Title>
          <Paragraph style={styles.step}>1. Complete the weekly questionnaire</Paragraph>
          <Paragraph style={styles.step}>2. AI generates your personalized meal plan</Paragraph>
          <Paragraph style={styles.step}>3. Review and adjust meals as needed</Paragraph>
          <Paragraph style={styles.step}>4. Get your shopping list automatically</Paragraph>
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
  step: {
    fontSize: 14,
    color: colors.darkGray,
    marginVertical: 4,
    paddingLeft: 8,
  },
});
