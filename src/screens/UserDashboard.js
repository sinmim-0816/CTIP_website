import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import { ListPlus, ChevronRight } from 'lucide-react-native';
import Checkbox from 'expo-checkbox';
import { Calendar } from 'react-native-calendars';

// Import Components
import CourseCard from '../components/CourseCard.js';

const UserDashboard = () => {
    const [courses, setCourses]=useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [todos, setTodos] = useState([]);
    const [userType, setUserType] = useState('');
    const [progressData, setProgressData] = useState([]);
    
    // Fetch user type
    useEffect(() => {
        fetch('http://localhost:5000/api/userType')
        .then(res => {
            console.log("Response status:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("User type received:", data);
            setUserType(data);
        })
        .catch(err => console.error("Fetch error:", err));
    }, []);

    // Fetch progress data
    useEffect(() => {
        fetch('http://localhost:5000/api/progress')
        .then(res => {
            console.log("Response status:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("Progress received:", data);
            setProgressData(data);
        })
        .catch(err => console.error("Fetch error:", err));
    }, []);

    // Fetch courses
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

    // Toggle checkbox
    const toggleTodo = (id) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Filter todos by selected date
    const filteredTodos = selectedDate
        ? todos.filter(todo =>
            new Date(todo.date).toDateString() === new Date(selectedDate).toDateString()
        )
        : todos;

    return(
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.dashboardTitle}>Dashboard</Text>
            </View>

            <View style={styles.topRow}>
                {/* Left side */}
                <View style={styles.leftColumn}>
                    <View style={styles.cardContainer}>
                        {courses.map(course=>{
                            const courseProgress = progressData.find(p => p.course === course.courseTitle);
                            return(
                                <CourseCard
                                    key={course.id}
                                    id={course.id}
                                    imagePath={{uri:course.image}}
                                    courseTitle={course.courseTitle}
                                    numModules={course.numModules}
                                    duration={course.duration}
                                    expiry={course.expiryDate}
                                    progress={courseProgress?.progress}
                                    userType={userType}
                                    onPress={()=> navigation.navigate('Course Details', {id:course.id})}
                                />
                                );
                            }
                        )}
                    </View>
                </View>

                {/* Right side */}
                <View style={styles.rightColumn}>
                    <View style={styles.calendarContainer}>
                        <Calendar
                            onDayPress={(day) => {
                                if(selectedDate === day.dateString){
                                    setSelectedDate(null);
                                } else {
                                    setSelectedDate(day.dateString);
                                }
                            }}
                            markedDates={{
                                [selectedDate]: { selected: true }
                            }}
                        />
                    </View>

                    <View style={styles.todoList}>
                        <View style={styles.todoHeader}>
                            <Text style={styles.todoListTitle}>Todo List</Text>

                            <Pressable onPress={() => setShowModal(true)}>
                                <ListPlus size={20} />
                            </Pressable>
                        </View>
                        {filteredTodos.length === 0 ? (
                            <Text>No todos</Text>
                        ) : (
                            filteredTodos.map(todo => (
                                <View key={todo.id} style={styles.todoItem}>
                                    <View style={styles.todoRow}>
                                        <Checkbox
                                            value={todo.completed}
                                            onValueChange={() => toggleTodo(todo.id)}
                                        />
                                        <View style={{flex: 1}}>
                                            <Text style={styles.todoTitle}>{todo.title}</Text>
                                            <Text style={styles.todoCourse}>{todo.course} - {todo.date}</Text>
                                        </View>

                                        <Pressable onPress={() => openEdit(todo)}>
                                            <ChevronRight size={20} />
                                        </Pressable>
                                    </View>
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
    leftColumn:{
        flex: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    rightColumn:{
        flex: 1,
        flexDirection: 'column',
        gap: 20,
    },
    calendarContainer: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 5,
        marginBottom: 10,
    },
    todoListTitle:{
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    todoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    todoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    todoList:{
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 10,
    },
    todoItem:{
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        marginVertical: 15
    },
    todoTitle:{
        fontSize: 16,
    },
    todoCourse:{
        color: '#888888',
        fontSize: 12,
    }
});

export default UserDashboard;