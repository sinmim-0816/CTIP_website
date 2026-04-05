import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, Pressable, TextInput,  ImageBackground, ScrollView} from 'react-native';
import {CopyPlus, Search, SlidersHorizontal} from 'lucide-react-native';

// Import Components
import OutlineBar from '../components/OutlineBar.js';

const EditCourseDetail = ({route}) => {
    const {selectedCourse: initialCourse}=route.params || {};
    const [selectedCourse, setSelectedCourse]=useState(initialCourse);
    const [selectedPage, setSelectedPage]=useState(null);

    useEffect(()=>{
        if(initialCourse){
            setSelectedCourse(initialCourse);
        }
    },[initialCourse]);

    return (
        <View style={styles.rowContainer}>
            {/* Outlinebar */}
            <OutlineBar course={selectedCourse} onSelectPage={setSelectedPage}/>
            {/* Content */}
            <ScrollView style={styles.container}>
                {selectedPage?.type === 'page' ? (
                    <Text>Editing: {selectedPage.page.title}</Text>
                ) : (
                    <Text>Welcome to {selectedCourse?.courseTitle} Overview</Text>
                )}
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection:'row',
    },
    

});

export default EditCourseDetail;