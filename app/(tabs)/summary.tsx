import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { transactions, BALANCE } from '@/data/data';

const InfoCard = ({ title, value, type, icon }: { title: string, value: string, type?: 'credit' | 'debit' | 'balance', icon: string }) => {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={type === 'credit' ? ['#4CAF50', '#45a049'] : type === 'debit' ? ['#f44336', '#d32f2f'] : ['#2196F3', '#1976D2']}
        style={styles.cardGradient}
      >
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={24} color="white" />
          </View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardValue}>{value}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default function TabTwoScreen() {
  const totalCredited = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'credit') return acc + transaction.amount;
    return acc;
  }, 0);

  const totalDebited = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'debit') return acc + transaction.amount;
    return acc;
  }, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Financial Summary</Text>
        </View>
        <View style={styles.container}>
          <InfoCard title="Total Credited" value={`$${totalCredited.toLocaleString()}`} type="credit" icon="arrow-up-circle" />
          <InfoCard title="Total Debited" value={`$${totalDebited.toLocaleString()}`} type="debit" icon="arrow-down-circle" />
          <InfoCard title="Current Balance" value={`$${BALANCE.toLocaleString()}`} type="balance" icon="wallet" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#1976D2',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardGradient: {
    padding: 20,
  },
  cardContent: {
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
});