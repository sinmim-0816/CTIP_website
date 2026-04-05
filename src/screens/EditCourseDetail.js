import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, Pressable, TextInput,  ImageBackground, ScrollView} from 'react-native';
import {CopyPlus, Search, SlidersHorizontal} from 'lucide-react-native';

// Import Components
import OutlineBar from '../components/OutlineBar.js';


const EditCourseDetail = ({route}) => {
    const {selectedCourse: initialCourse}=route.params || {};
    const [selectedCourse, setSelectedCourse]=useState(null);
    const [selectedPage, setSelectedPage]=useState(null);


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
    container: {
        flex: 1,
        padding: 20,
        marginHorizontal:10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'white'
    },
    description: {
        fontSize: 14,
        lineHeight: 24,
        color:'white',
    },
    courseContainer:{
        paddingHorizontal:40,
        paddingVertical:30,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'space-between',
        userSelect:'none'
    },
    backgroundImage:{
        width:'100%',
        borderRadius:20,
        overflow:'hidden',
        resizeMode:'fill',
        marginTop:10,
    },
    btn:{
        flexDirection:'row',
        gap:8,
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'#4a8947',
        borderRadius:50,
        color:'white',
        paddingHorizontal:23,
        paddingVertical:13,
    },
    btnHover:{
        backgroundColor:'#2f6618fe'
    },
    btnText:{
        color:'white'
    },
    search:{
        flexDirection:'row',
        gap:7,
        borderWidth:1,
        borderColor:'#8f8f8f',
        minWidth:300,
        padding:5,
        backgroundColor:'white',
        borderRadius:15,
        alignItems:"center"
    },
    input:{
        flex:1,
        paddingVertical:2,
        outlineStyle:'none'
    },
    cardContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        gap:30,
        marginTop:20, 
    },
    filter:{
        flexDirection:'row',
        paddingVertical:5,
        paddingRight:10,
        borderRadius:5,
    },
    filterHover:{
        color:'#efab21'
    },
    toolbar:{
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:20,
    }

});

export default EditCourseDetail;