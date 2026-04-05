import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, Pressable, TextInput,  ImageBackground, ScrollView} from 'react-native';
import { ListPlus } from 'lucide-react-native';

// Import Components
import CourseCard from '../components/CourseCard.js';

const UserDashboard = () => {

    // Fetch courses
    const [courses, setCourses]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/api/courses')
        .then(res => {
            console.log("Response status:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("Courses received:", data);
            setCourses(data);
        })
        .catch(err => console.error("Fetch error:", err));
    },[]);

    // Fetch todos
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/todos')
        .then(res => {
            console.log("Response status:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("Todos received:", data);
            setTodos(data);
        })
        .catch(err => console.error("Fetch error:", err));
    }, []);

    
    return(
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.dashboardTitle}>Dashboard</Text>
            </View>

            <View style={styles.topRow}>
                {/* Left side */}
                <View style={styles.coursesColumn}>
                    <View style={styles.cardContainer}>
                        {courses.map(course=>(
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                imagePath={{uri:course.image}}
                                courseTitle={course.courseTitle}
                                numModules={course.numModules}
                                duration={course.duration}
                                expiry={course.expiryDate}
                            />
                        ))}
                    </View>
                </View>

                {/* Right side */}
                <View style={styles.calendarColumn}>
                    <View style={styles.calendar}>
                        <Text>Calendar</Text>
                    </View>

                    <View style={styles.todoList}>
                        <Text style={styles.todoTitle}>Todo List <ListPlus size={20}/></Text>
                        {todos.length === 0 ? (
                            <Text>No todos</Text>
                        ) : (
                            todos.map(todo => (
                            <View 
                                key={todo.id} 
                                style={styles.todoItem}>
                                <Text>{todo.title} — {todo.course}</Text>
                            </View>
                            ))
                        )}
                    </View>
                </View>
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
        marginTop:20,
        gap:30,
    },
    topRow:{
        flexDirection: 'row',
        gap: 20,
    },
    coursesColumn:{
        flex: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    calendarColumn:{
        flex: 1,
        flexDirection: 'column',
        gap: 20,
    },
    calendar:{
        height: 150,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    todoTitle:{
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    todoList:{
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 10,
        overflow: 'auto',
    },
    todoItem:{
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default UserDashboard;