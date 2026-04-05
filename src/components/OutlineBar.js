import React,{useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList,TextInput} from 'react-native';
import {Folder, ChevronRight, ChevronDown,Search} from 'lucide-react-native';

const OutlineBar=({course, onSelectPage})=>{
    const [expandedModule, setExpandedModule]=useState(null);
    const [selectedItem, setSelectedItem]=useState({type:'overview'});

    if(!course){
        return;
    }

    const toggleModule=(moduleId)=>{
        setExpandedModule(expandedModule===moduleId ? null :moduleId);
    };

    const handleSelect=(item)=>{
        setSelectedItem(item);
        onSelectPage(item);
    }

    return(
        <View style={styles.outlinebar}>
            {/* Search Component */}
            <View style={styles.search}>
                <Search size={18}/>
                <TextInput style={styles.input} placeholder='Search...' placeholderTextColor="#8f8f8f"/>
            </View>
            {/* Overview */}
            <Pressable style={[styles.item,selectedItem?.type === 'overview' && styles.selected]} onPress={()=> handleSelect({type:'overview', course})}>
                <Text style={styles.overview}>Course Overview</Text>
            </Pressable>
            {/* Modules */}
            <FlatList
                data={course.modules}
                keyExtractor={module => module.moduleId.toString()}
                renderItem={({ item: module }) => (
                    <View style={[selectedItem?.type==='module' && selectedItem?.module?.moduleId===module.moduleId && styles.selectedModule]}>
                        <Pressable style={[styles.moduleBlock, selectedItem?.type==='module' && selectedItem?.module?.moduleId===module.moduleId && styles.selected]} onPress={()=> {handleSelect({type:'module', module}); toggleModule(module.moduleId)}}>
                            <Text style={styles.moduleTitle}>Module {module.moduleId}: {module.title}</Text>
                            {expandedModule === module.moduleId ? <ChevronDown/> : <ChevronRight/>}
                        </Pressable>
                        
                        {expandedModule === module.moduleId && (
                            <View>
                                {module.pages.map(page => (
                                    <Pressable
                                    key={page.pageId} style={[styles.pageItem, selectedItem?.pageId === page.pageId && styles.selected]}
                                    onPress={() => handleSelect({type:'page', module, page})}
                                    >
                                    <Text>{page.pageId.toFixed(1)}: {page.title}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
}

const styles=StyleSheet.create({
    outlinebar:{
        maxWidth:'220px',
        minHeight:'100vh',
        userSelect:'none',
        flex:1,
        backgroundColor:'white',
        paddingVertical:15
    },
    overview:{
        fontSize:16,
        fontWeight:'600',
        paddingHorizontal:20,
        paddingVertical:5
    },
    moduleBlock:{
        flexDirection:'row',
        minHeight:'50px',
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:15
    },
    moduleTitle:{
        minWidth:'165px'
    },
    search:{
        flexDirection:'row',
        gap:3,
        borderWidth:1,
        borderColor:'#8f8f8f',
        maxWidth:185,
        paddingVertical:5,
        paddingHorizontal:3,
        backgroundColor:'white',
        borderRadius:15,
        alignItems:"center",
        marginBottom:25,
        marginHorizontal:20,
    },
    input:{
        flex:1,
        maxWidth:140,
        outlineStyle:'none'
    },
    selected:{
        backgroundColor:'#61aa6247'
    },
    selectedModule:{
        backgroundColor:'#dcffe889'
    },
    item:{
        paddingVertical:10
    },
    pageItem:{
        paddingLeft:30,
        paddingVertical:10
    }
});

export default OutlineBar;