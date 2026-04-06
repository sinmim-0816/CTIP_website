import React,{useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList,TextInput} from 'react-native';
import {Plus, ChevronRight, ChevronDown,Search} from 'lucide-react-native';

const OutlineBar=({course, onSelectPage, editable})=>{
    // Set State
    const [expandedModule, setExpandedModule]=useState(null);
    const [selectedItem, setSelectedItem]=useState({type:'overview'});
    const [hoveredItem, setHoveredItem]=useState(null);
    const [newSections, setNewSectons]=useState([]);
    const [editingItem, setEditingItem]=useState(null);
    const [modules, setModules]=useState(course.modules);
    const allModules=[...modules, ...newSections];

    if(!course){
        return;
    }

    // Function
    const toggleModule=(moduleId)=>{
        setExpandedModule(expandedModule===moduleId ? null :moduleId);
    };

    const handleSelect=(item)=>{
        setSelectedItem(item);
        onSelectPage(item);
    }

    const handleAddSection=()=>{
        if(!editable){
            return;
        }
        const existingIds=[
            ...course.modules.map(m=>m.moduleId),
            ...newSections.map(s=>s.moduleId)
        ];
        const nextId=existingIds.length>0 ? Math.max(...existingIds) + 1 :1;

        setNewSectons([...newSections, {moduleId:nextId, title:'', pages:[]}]);
    };

    const handleBlur=async(moduleId, value)=>{
        if(!editable){
            return;
        }

        // Update local state
        setNewSectons((prev)=>
            prev.map((s)=>(s.moduleId===moduleId ? {...s, title: value} :s))    
        );

        const newModule={
            moduleId,
            title:value,
            pages:[]
        };

        // Call backend API to persist
        try {
            await fetch(`http://localhost:5000/api/courses/${course.id}/modules`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newModule),
            });
        } catch (err) {
        console.error('Failed to update section:', err);
        }
    };

    const handleModuleUpdate=async(moduleId, newTitle)=>{
        if(!newTitle.trim()){
            setEditingItem(null);
            return;
        }
        setModules(prev=>prev.map(m=>m.moduleId === moduleId ? {...m,title:newTitle} : m))
        setNewSectons(prev=>prev.map(s=>(s.moduleId===moduleId ? {...s, title:newTitle} :s)));
        setEditingItem(null);
        try{
            await fetch(`http://localhost:5000/api/courses/${course.id}/modules/${moduleId}`,{
                method:'PUT',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({title:newTitle}),
            });
        }catch (err){
            console.error('Failed to update module:', err);
        }
    };

    const handleAddPage=(moduleId)=>{
        setNewSectons(prev=>prev.map(m=>{
            if(m.moduleId===moduleId){
                const existingCount=m.pages.length;
                const nextIndex=existingCount;
                const newPageId=`${moduleId}.${nextIndex}`;

                return{
                    ...m, pages:[...m.pages, {pageId: newPageId, title:''}]
                };
            }
            return m;
        }
        ));
    };

    const handlePageBlur=async(moduleId, pageId, value)=>{
        setNewSectons(prev=> 
            prev.map(m=>
                m.moduleId===moduleId
                ? {
                    ...m, pages:m.pages.map(p=>
                        p.pageId===pageId ? {...p,title:value} : p
                    )
                }
                :m
            )
        );

        const newPage={pageId, title:value};
        try{
            await fetch(`http://localhost:5000/api/courses/${courseId}/modules/${moduleId}/pages`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(newPage),
            });
        } catch(err){
            console.error('Failed to add page', err);
        }
    };

    const handlePageUpdate=async(moduleId, pageId, newTitle)=>{
        if(!newTitle.trim()){
            setEditingItem(null);
            return;
        }
        setModules(prev=>prev.map(m=>{
            if(m.moduleId===moduleId){
                return{
                    ...m, pages:m.pages.map(p=>p.pageId === pageId ? {...p, title:newTitle} :p)
                };
            }
            return m;
        }));

        try{
            await fetch(`http://localhost:5000/api/courses/${courseId}/modules/${moduleId}/pages/${pageId}`,{
                method:'PUT',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({title:newTitle}),
            });
        } catch(err){
            console.error('Failed to update page:', err);
        }
    }

    return(
        <View style={styles.outlinebar}>
            {/* Search Component */}
            <View style={styles.search}>
                <Search size={18}/>
                <TextInput style={styles.input} placeholder='Search...' placeholderTextColor="#8f8f8f"/>
            </View>
            {/* Overview */}
            <Pressable style={[styles.item,selectedItem?.type === 'overview' && styles.selected]} 
            onPress={()=> handleSelect({type:'overview', course})} 
            onMouseEnter={()=>setHoveredItem({type: 'overview'})}
            onMouseLeave={()=>setHoveredItem(null)}
            >
                <Text style={styles.overview}>Course Overview</Text>
                {editable && hoveredItem?.type==='overview' && (
                    <Pressable onPress={handleAddSection}>
                        <Plus size={16}/>
                    </Pressable>
                )}
            </Pressable>
            {/* Modules */}
            <FlatList
                data={allModules}
                keyExtractor={module => module.moduleId.toString()}
                renderItem={({ item: module }) => (
                    <View style={[
                        (selectedItem?.type==='module' && selectedItem?.module?.moduleId===module.moduleId) || (selectedItem?.type==='page' && selectedItem?.module?.moduleId===module.moduleId) 
                        ? styles.selectedModule : null]}>

                        <Pressable style={[styles.moduleBlock,
                             (selectedItem?.type==='module' && selectedItem?.module?.moduleId===module.moduleId) ||
                             (selectedItem?.type==='page' && selectedItem?.module?.moduleId === module.moduleId)
                              ? styles.selected : null]} 
                              onPress={()=> {
                                if(editingItem?.id === module.moduleId){
                                    return;
                                }
                                handleSelect({type:'module', module}); toggleModule(module.moduleId);
                                if(editable){
                                    setEditingItem({type:'module', id:module.moduleId});
                                };
                                }}
                              >
                            <Text style={styles.moduleTitle}>Module {module.moduleId}:{" "} 
                                {/* Add New Section (blank title) */}
                                {editable && module.title === "" ? (
                                    <TextInput
                                    style={styles.section}
                                    placeholder="Enter module name..."
                                    placeholderTextColor="#8f8f8f"
                                    defaultValue={module.title}
                                    onBlur={(e) => handleBlur(module.moduleId, e.nativeEvent.text)}
                                    />
                                ) : (
                                    // Show Module Title or Editing Input
                                    editingItem?.type === 'module' && editingItem.id === module.moduleId ? (
                                    <TextInput
                                        style={styles.section}
                                        defaultValue={module.title}
                                        autoFocus
                                        onBlur={(e) => handleModuleUpdate(module.moduleId, e.nativeEvent.text)}
                                    />
                                    ) : (
                                    <Text>{module.title}
                                    </Text>
                                    )
                                )}  

                            </Text>
                            {expandedModule === module.moduleId ? <ChevronDown/> : <ChevronRight/>}
                        </Pressable>
                        
                        {expandedModule === module.moduleId && (
                            <View onMouseEnter={() => setHoveredItem({ type: 'page', moduleId: module.moduleId})}
                                onMouseLeave={() => setHoveredItem(null)}>
                                {module.pages.map(page => 
                                    page.title==='' ? (
                                        <TextInput
                                            key={page.pageId}
                                            style={styles.section}
                                            placeholder="Enter page title..."
                                            placeholderTextColor="#8f8f8f"
                                            defaultValue={page.title}
                                            onBlur={(e) => handlePageBlur(module.moduleId, page.pageId, e.nativeEvent.text)}
                                        />
                                    ):(
                                        <Pressable
                                        key={page.pageId} style={[styles.pageItem, selectedItem?.type==='page' && selectedItem?.page.pageId === page.pageId && styles.selectedPage]}
                                        onPress={() => handleSelect({type:'page', module,page})}
                                        >
                                            <Text>{page.pageId.toFixed(1)}: {page.title}</Text>
                                        </Pressable>
                                    )
                                )}
                                {/* Show + Add New Page when hovering */}
                                {editable && hoveredItem?.type === 'page' && hoveredItem.moduleId === module.moduleId && (
                                    <Pressable
                                    onPress={() => handleAddPage(module.moduleId)}
                                    style={styles.pageItem}
                                    >
                                        <Text style={styles.addPage}>+ Add New Page</Text>
                                    </Pressable>
                                )}

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
        paddingLeft:20,
        paddingVertical:5,
        paddingRight:40
    },
    moduleBlock:{
        flexDirection:'row',
        minHeight:'50px',
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:15,
    },
    moduleTitle:{
        minWidth:'165px',
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
        backgroundColor:'#A5D6A7'
    },
    selectedModule:{
        backgroundColor:'#E8F5E9'
    },
    selectedPage:{
        backgroundColor:'#9ee5a375'
    },
    item:{
        paddingVertical:10,
        flexDirection:"row",
        alignItems:'center'
    },
    pageItem:{
        paddingLeft:30,
        paddingRight:10,
        paddingVertical:10,
    },
    section:{
        borderWidth: 1,
        borderColor: '#8f8f8f',  // subtle gray border
        borderRadius: 6,
        backgroundColor: '#f9f9f9',
        paddingVertical:6,
        paddingHorizontal:10,
        marginTop:5
    },
    addPage:{
        color:'#3f3f3f'
    }
});

export default OutlineBar;