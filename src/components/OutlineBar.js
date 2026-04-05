import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const OutlineBar=({course, onSelectPage})=>{
    if(!course){
        return;
    }

    return(
        <View style={styles.outlinebar}>
            <Pressable>
                <Text onPress={()=> onSelectPage({type:'overview', course})}>Course Overview</Text>
            </Pressable>
            {/* Modules */}
            {course.modules.map(module => (
                <View key={module.moduleId}>
                    <Text>Module {module.moduleId}: {module.title}</Text>
                    {module.pages.map(page=>(
                        <Pressable key={page.pageId} onPress={()=> onSelectPage({type: 'page', module, page})}>
                            <Text>{page.title}</Text>
                        </Pressable>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles=StyleSheet.create({
    outlinebar:{
        maxWidth:'220px',
        border:'1px solid black',
        minHeight:'100vh',
        userSelect:'none',
        paddingHorizontal:20,
        flex:1
    }
});

export default OutlineBar;