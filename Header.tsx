import { StyleSheet, View, Image, TextInput } from 'react-native';
import { AntDesign }  from '@expo/vector-icons';

export default function Header(props: headerProps) {
    return (
        <View style={styles.header}>
            <View style={styles.headerContainer}>
                <View style={styles.upperHeader}>
                <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={require('./assets/logo.png')}
                />
                <Image
                    style={styles.pfp}
                    source={require('./assets/Suzumiya_Haruhi.jpg')}
                />
                </View>
                <View style={styles.searchBar}>
                <AntDesign
                    name='search1'
                    size={14}
                    color='#797979'  
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="search friends..."
                />
                </View>
            </View>
        </View>
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
  });