import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, SafeAreaView, StyleSheet, TextStyle } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface DetailRowProps {
    label: string;
    value: string;
    valueStyle?: TextStyle;
}

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: string;
}

function TransactionDetailScreen({ transaction, hideModal }: { transaction: Transaction, hideModal: () => void }) {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={true}
            onRequestClose={hideModal}
        >
            <SafeAreaView style={styles.modalContainer}>
                <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.modalHeaderGradient}
                >
                    <Text style={styles.modalTitle}>Transaction Detail</Text>
                    <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </LinearGradient>
                <View style={styles.contentContainer}>
                    <DetailRow label="Transaction ID" value={transaction.id} />
                    <DetailRow label="Date" value={transaction.date} />
                    <DetailRow label="Description" value={transaction.description} />
                    <DetailRow
                        label="Amount"
                        value={`${transaction.type === 'debit' ? '-' : '+'} $${transaction.amount}`}
                        valueStyle={{ color: transaction.type === 'debit' ? '#f44336' : '#4CAF50' }}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const DetailRow = ({ label, value, valueStyle }: DetailRowProps) => (
    <View style={styles.detailRow}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
);

export default function Card({ transaction }: { transaction: Transaction }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <TouchableOpacity onPress={() => setShowDetails(true)} style={styles.cardContainer}>
            {showDetails && (
                <TransactionDetailScreen
                    transaction={transaction}
                    hideModal={() => setShowDetails(false)}
                />
            )}
            <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                    <Text style={styles.dateText}>{transaction.date}</Text>
                    <Text style={styles.descriptionText}>{transaction.description}</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={[
                        styles.amountText,
                        { color: transaction.type === 'debit' ? '#f44336' : '#4CAF50' }
                    ]}>
                        {transaction.type === 'debit' ? '-' : '+'} ${transaction.amount}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    leftContent: {
        flex: 1,
    },
    rightContent: {
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    amountText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    modalHeaderGradient: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    closeButton: {
        padding: 5,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingVertical: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    value: {
        fontSize: 16,
        color: '#666',
    },
});