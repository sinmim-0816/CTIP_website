import { View, Text, StyleSheet, Pressable, TextInput,  ImageBackground, ScrollView} from 'react-native';
import {CopyPlus, Scroll, Search, SlidersHorizontal} from 'lucide-react-native';

// Import Components
import CourseCard from '../components/CourseCard.js';

const UserDashboard = () => {
    return(
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.dashboardTitle}>Dashboard</Text>
            </View>

            <View style={styles.cardContainer}>
                <CourseCard imagePath={require('../../assets/first_aid.png')} courseTitle="Basic First Aid" numModules={15} duration="15 hours 30 mins" expiry={"05-08-2027"}/>
                <CourseCard imagePath={require('../../assets/first_aid.png')} courseTitle="Basic First Aid" numModules={15} duration="15 hours 30 mins" expiry={"05-08-2027"}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        marginHorizontal: 10
    },
    dashboardTitle:{
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 30,
    },
    cardContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        gap:30,
        marginTop:20,
    }
});

export default UserDashboard;