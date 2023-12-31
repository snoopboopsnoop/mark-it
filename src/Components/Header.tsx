import { useState } from 'react';
import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign }  from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type headerProps = {
  home: boolean,
  title: string,
}

export default function Header(props: headerProps) {
  const navigation = useNavigation();

  console.log("header titke => ", props.title)

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <View style={styles.header}>
          <View style={styles.headerContainer}>
              <View style={styles.upperHeader}>
                <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={require('../assets/logo.png')}
                />
                <View style={styles.buttonHeader}>
                  {props.home && <TouchableOpacity
                      style={[styles.friendButton]}
                      onPress={() => {
                        navigation.navigate('Friends')
                      }}
                    >
                      <AntDesign
                        name="adduser"
                        size={30}
                        color='#696969'
                      />
                  </TouchableOpacity>
                  }
                  <TouchableOpacity style={styles.pfp}
                    onPress={() => { 
                      Keyboard.dismiss();
                      navigation.openDrawer();
                    }}
                  >
                    <Image
                        style={styles.pfp}
                        source={require('../assets/Suzumiya_Haruhi.jpg')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {props.home &&
                <View style={styles.searchBar}>
                  <AntDesign
                      name='search1'
                      size={14}
                      color='#797979'  
                  />
                  <TextInput
                      style={styles.searchInput}
                      placeholder="search friends..."
                      placeholderTextColor={'#797979'}
                  />
                </View>
              }
              {!props.home &&
                <View style={styles.backBar}>
                  <TouchableOpacity
                    style={styles.backArrow}
                    onPress={() => {navigation.goBack()} }
                  >
                    <Ionicons name="arrow-back" size={24} color="#696969" />
                  </TouchableOpacity>
                  <Text style={styles.headerText}>{ props.title }</Text>
                  <View style={styles.backArrow}/>
                </View>
              }
          </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    header: {
      width: '100%',
      height: 160,
      gap: 10,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingHorizontal: 24,
      paddingVertical: 18,
      backgroundColor: '#EFEFEF',
      alignItems: 'center',
    },
    modal: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    headerContainer: {
      flex: 2,
      width: '100%',
      height: 84,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 0,
      gap: 13,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 11,
      paddingVertical: 3,
      gap: 6,
      width: '100%',
      height: 24,
      backgroundColor: '#D9D9D9',
      borderRadius: 10, 
    },
    searchButton: {
      width: 14,
      height: 13,
    },
    searchInput: {
      fontFamily: 'NunitoSans_400Regular',
      fontSize: 13,
      color: '#797979',
      lineHeight: 18,
      width: '100%',
    },
    upperHeader: {
      height: 46,
      width: '100%',
      flexDirection: 'row',
      padding: 0,
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    logo: {
      height: 22,
      width: 118,
    },
    pfp: {
      borderRadius: 40,
      width: 46,
      height: 46,
    },
    backBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 24,
    },
    headerText: {
      fontFamily: 'NunitoSans_400Regular',
      fontSize: 20,
      textAlign: 'center',
      color: '#696969'
    },
    backArrow: {
      height: '100%',
      aspectRatio: 1,
    },
    friendButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonHeader: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'flex-end',
    }
  });