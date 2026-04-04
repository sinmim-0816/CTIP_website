import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { Search, TextInitial} from 'lucide-react-native'
import { TextInput } from 'react-native-web';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
    return(
        <View style={styles.header}>
                {/* Search Component */}
                <View style={styles.search}>
                    <Search size={18} style={styles.icon}/>
                    <TextInput style={styles.input} placeholder='Search...' placeholderTextColor="#888" accessibilityLabel='Search input'/>
                </View>
                <Pressable>
                    <Ionicons name="notifications-outline" size={23}/>
                </Pressable>
                <Image source={require('../../assets/profile.png')} style={styles.profile} accessibilityLabel='Default Admin Profile'/>
            
        </View>
    )
}

const styles = StyleSheet.create({
   header:{
    zIndex:'10',
    flexDirection:'row',
    justifyContent:'end',
    alignItems:'center',
    height:65,
    paddingHorizontal:20,
    gap:16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor:'#ffffff'
   },
   
   search:{
    display:'flex',
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#A8A8A8',
    borderStyle:'solid',
    borderRadius:'5px',
    padding:'5px'
   },
   icon:{
    marginRight:8,
    color:'#4f4f4f'
   },
   profile:{
    width:45,
    height:45,
    borderRadius:50,
    resizeMode:'contain'
   }
});

export default Header;