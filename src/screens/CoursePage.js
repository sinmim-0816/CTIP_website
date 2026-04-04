import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CoursePage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.courseContainer}>
                <Text style={styles.title}>Course Page</Text>
                <Text style={styles.description}>This is where the course details will be displayed.</Text>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default CoursePage;