import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HomeIcon from '../assets/tab/home.svg'
import HomeIconActive from '../assets/tab/home-act.svg'
import Res from '../assets/tab/r.svg'
import Temp from '../assets/tab/temp.svg'
import Blog from '../assets/tab/blog.svg'
import ResAcy from '../assets/tab/r-act.svg'
import TempAct from '../assets/tab/temp-act.svg'
import BlogAct from '../assets/tab/blog-act.svg'

import fontFamily from '../constant/fontFamily';
const FocusedGradient = ['#4c669f', '#3b5998', '#192f6a'];
const NotFocusedGradient = ['#ffffff', '#ffffff'];

function CustomTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const image = options.tabBarIcon;
        const isFocused = state.index === index;

        const onPress = () => {
          
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        let Icon = '';
        if(label == 'Home'){
          Icon = <HomeIcon></HomeIcon>
        }else if(label == 'Templates'){
          Icon = <Res></Res>
        }else if(label == 'Restaurant'){
          Icon = <Temp></Temp>
        }else{
          Icon = <Blog></Blog>
        }
        let ActIcon = '';
        if(label == 'Home'){
          ActIcon = <HomeIconActive></HomeIconActive>
        }else if(label == 'Templates'){
          ActIcon = <ResAcy></ResAcy>
        }else if(label == 'Restaurant'){
          ActIcon = <TempAct></TempAct>
        }else{
          ActIcon = <BlogAct></BlogAct>
        }
        return (
          
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                minHeight: 65,
                
                backgroundColor:'#fff',
                width:'25%',
                justifyContent:'center',
                alignItems:'center'
                
              }}>
                {isFocused ? ActIcon : Icon}
              <Text style={{ color: isFocused ? '#607C34' : '#9D9D9D',fontSize:11,fontFamily:fontFamily.Regular }}>
                {label}
              </Text>
            </TouchableOpacity>
          
        );
      })}
    </View>
  );
}

export default CustomTabBar;