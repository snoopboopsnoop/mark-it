import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Friend } from '../../App';

export default function Footer( friend:Friend ) {
    const navigation = useNavigation()

    console.log("footer friednd => ", friend)
    return (
        <View style={styles.footer}>
          {/* <View style={[styles.addButton, {borderRadius: 0, backgroundColor: 'transparent'}]}/> */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate('TransactionPage', { friendData: friend })
            }}
          >
            <AntDesign
              name="plus"
              size={24}
              color='#EFEFEF'
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[styles.addButton, {borderRadius: 0, backgroundColor: 'transparent'}]}
            onPress={() => {
              navigation.navigate('Friends')
            }}
          >
            <AntDesign
              name="adduser"
              size={30}
              color='#696969'
            />
          </TouchableOpacity> */}
      </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        height: 92,
        backgroundColor: '#EFEFEF',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 15,
        gap: 40,
      },
      addButton: {
        borderRadius: 40,
        width: 41,
        height: 41,
        backgroundColor: '#B0D3AA',
        alignItems: 'center',
        justifyContent: 'center',
      }
})