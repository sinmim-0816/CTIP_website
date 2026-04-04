import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminCourse = () => {
    return (
        <View style={styles.container}>
            <View style={styles.courseContainer}>
                <Text style={styles.description}>Here you can find all courses</Text>
                <Text style={styles.title}>All Courses</Text>
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
        fontSize: 14,
        lineHeight: 24,
        color:'#8f8f8f'
    },
    courseContainer:{
        backgroundColor:'#ffffff',
        paddingHorizontal:40,
        paddingVertical:30,
        borderRadius:20
    }
});

export default AdminCourse;