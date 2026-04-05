import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Import Screens
import AdminCourse from './src/screens/AdminCourse';
import SideBar from './src/components/SideBar';
import EditCourseDetails from './src/screens/EditCourseDetail';

export default function App() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <SideBar />
        
        {/* Main Content Area */}
        <View style={styles.content}>
          {/* <AdminCourse/> */}
          <EditCourseDetails/>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, 
    padding:0,
    margin:0
  },
  container: {
    flex: 1,           
    flexDirection: 'row', 
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor:"#f2f2f2"
  }
});
