import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Footer() {
    const navigation = useNavigation()

    return (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate('TransactionPage')
            }}
          >
            <AntDesign
              name="plus"
              size={24}
              color='#EFEFEF'
            />
          </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        height: 92,
        backgroundColor: '#EFEFEF',
        alignItems: 'center',
        paddingTop: 10,
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