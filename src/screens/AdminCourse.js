import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Image} from 'react-native';
import {CopyPlus, Search, BookOpenText, Timer, CheckCheck} from 'lucide-react-native';


const AdminCourse = () => {
    return (
        <View style={styles.container}>
            <View style={styles.courseContainer}>
                <View>
                    <Text style={styles.description}>Here you can find all courses</Text>
                    <Text style={styles.title}>All Courses</Text>
                </View>
                <Pressable style={({ hovered }) => [
                        styles.btn,
                        hovered && styles.btnHover, 
                    ]}>
                    <CopyPlus/>
                    <Text style={styles.btnText}>Add Course</Text>
                </Pressable>
            </View>
            {/* Search */}
            <View style={styles.search}>
                <Search size={18}/>
                <TextInput style={styles.input} placeholder='Search...' placeholderTextColor="#8f8f8f"/>
            </View>

            {/* Course Card */}
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Image source={require('../../assets/first_aid.png')} style={styles.courseImg} accessibilityLabel='Cover Photo of Course'/>
                    <Text style={styles.CourseTitle}>Basic First Aid</Text>
                    
                    <View style={styles.courseDetails}>
                        <BookOpenText size={20}/>
                        <Text style={styles.DetailsText}>15 Modules</Text>
                    </View>
                    <View style={styles.courseDetails}>
                        <Timer size={20}/>
                        <Text style={styles.DetailsText}>15 hours 30 mins</Text>
                    </View>
                    <Pressable style={styles.Publishbtn}>
                        <CheckCheck/>
                        <Text>Published</Text>
                    </Pressable>
                </View>
                <View style={styles.card}>
                    <Image source={require('../../assets/first_aid.png')} style={styles.courseImg} accessibilityLabel='Cover Photo of Course'/>
                    <Text style={styles.CourseTitle}>Basic First Aid</Text>
                    <View style={styles.courseDetails}>
                        <BookOpenText size={20}/>
                        <Text style={styles.DetailsText}>15 Modules</Text>
                    </View>
                    <View style={styles.courseDetails}>
                        <Timer/>
                        <Text>15 hours 30 mins</Text>
                    </View>
                    <Pressable style={styles.btn}>
                        <CopyPlus/>
                        <Text>Published</Text>
                    </Pressable>
                </View>
                <View style={styles.card}>
                    <Image source={require('../../assets/first_aid.png')} style={styles.courseImg} accessibilityLabel='Cover Photo of Course'/>
                    <Text style={styles.CourseTitle}>Basic First Aid</Text>
                    
                    <View style={styles.courseDetails}>
                        <BookOpenText size={20}/>
                        <Text style={styles.DetailsText}>15 Modules</Text>
                    </View>
                    <View style={styles.courseDetails}>
                        <Timer/>
                        <Text>15 hours 30 mins</Text>
                    </View>
                    <Pressable style={styles.btn}>
                        <CopyPlus/>
                        <Text style={styles.btnText}>Published</Text>
                    </Pressable>
                </View>
                <View style={styles.card}>
                    <Image source={require('../../assets/first_aid.png')} style={styles.courseImg} accessibilityLabel='Cover Photo of Course'/>
                    <Text style={styles.CourseTitle}>Basic First Aid</Text>
                    <View style={styles.courseDetails}>
                        <BookOpenText size={20}/>
                        <Text style={styles.DetailsText}>15 Modules</Text>
                    </View>
                    <View style={styles.courseDetails}>
                        <Timer/>
                        <Text>15 hours 30 mins</Text>
                    </View>
                    <Pressable style={styles.btn}>
                        <CopyPlus/>
                        <Text style={styles.btnText}>Published</Text>
                    </Pressable>
                </View>
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
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    btn:{
        flexDirection:'row',
        gap:8,
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'#0a6340',
        borderRadius:50,
        color:'white',
        paddingHorizontal:23,
        paddingVertical:13
    },
    btnHover:{
        backgroundColor:'#4ba525fe'
    },
    btnText:{
        color:'white'
    },
    search:{
        flexDirection:'row',
        gap:7,
        borderWidth:1,
        borderColor:'#8f8f8f',
        maxWidth:300,
        marginTop:20,
        marginLeft:10,
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
    courseImg:{
        width:250,
        height:180,
        resizeMode:'contain',
        alignSelf:'center'
    },
    card:{
        flex:1,
        backgroundColor:"white",
        borderRadius:5,
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10
    },
    cardContainer:{
        flexDirection:'row',
        gap:30,
        marginHorizontal:20,
        marginTop:20,
        
    },
    CourseTitle:{
        borderBottomColor:'#8f8f8f',
        borderBottomWidth:1,
        fontSize:19,
        paddingVertical:10,
        marginBottom:10,
        textAlign:'center',
        fontWeight:'bold'
    },
    courseDetails:{
        flexDirection:'row',
        alignContent:'center',
        padding:2,
        color:'#3e3e3e',
        gap:5
    },
    DetailsText:{
        color:'#3e3e3e',
        fontSize:14
    },
    Publishbtn:{
        flexDirection:'row',
        gap:8,
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'#ffc146',
        borderRadius:50,
        paddingHorizontal:23,
        paddingVertical:10,
        marginTop:15,
    },
});

export default AdminCourse;