import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, List } from 'react-native-paper';
import { colors } from '../lib/theme';

export function ShopScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Shopping List</Title>
        <Paragraph style={styles.subtitle}>Your weekly grocery list</Paragraph>
      </View>

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Title style={styles.cardTitle}>No Shopping List Yet</Title>
          <Paragraph style={styles.cardText}>
            Generate a meal plan first to create your shopping list automatically.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <Title style={styles.cardTitle}>Features Coming Soon</Title>
          <List.Section>
            <List.Item
              title="Organize by Store"
              description="Items grouped by your preferred stores"
              left={props => <List.Icon {...props} icon="store" />}
            />
            <List.Item
              title="Smart Sync"
              description="Sync with Apple Reminders and Lists"
              left={props => <List.Icon {...props} icon="sync" />}
            />
            <List.Item
              title="Check Off Items"
              description="Mark items as purchased while shopping"
              left={props => <List.Icon {...props} icon="checkbox-marked" />}
            />
            <List.Item
              title="Inventory Tracking"
              description="Automatically update your inventory"
              left={props => <List.Icon {...props} icon="package-variant" />}
            />
          </List.Section>
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
});
