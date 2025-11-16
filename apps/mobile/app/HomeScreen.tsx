import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Title, Paragraph } from 'react-native-paper';
import { useAuthStore } from '../stores/authStore';
import { colors } from '../lib/theme';

export function HomeScreen() {
  const { user, initialize, loading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);

  const getDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getTodayDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.greeting}>{getDayGreeting()}! </Title>
        <Paragraph style={styles.date}>Today is {getTodayDate()}</Paragraph>
      </View>

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Title style={styles.cardTitle}>Welcome to GoodLifeNels</Title>
          <Paragraph style={styles.cardText}>
            Your AI-powered nutrition planning companion for the whole family.
          </Paragraph>
          <Paragraph style={styles.cardSubtext}>
            Get started by creating your first weekly meal plan!
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" style={styles.button}>
            Start Questionnaire
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <Title style={styles.cardTitle}>Quick Actions</Title>
          <View style={styles.quickActions}>
            <Button mode="outlined" style={styles.quickActionButton} icon="book-open-variant">
              Browse Recipes
            </Button>
            <Button mode="outlined" style={styles.quickActionButton} icon="cart-plus">
              Add Items
            </Button>
          </View>
        </Card.Content>
      </Card>

      {user && (
        <Card style={styles.card} mode="outlined">
          <Card.Content>
            <Title style={styles.cardTitle}>Your Profile</Title>
            <Paragraph>Email: {user.email}</Paragraph>
            <Paragraph>ID: {user.id}</Paragraph>
          </Card.Content>
        </Card>
      )}
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.offBlack,
  },
  date: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 4,
  },
  card: {
    margin: 16,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.deepForestGreen,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 8,
  },
  cardSubtext: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 8,
  },
  button: {
    marginTop: 12,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  quickActionButton: {
    flex: 1,
  },
});
