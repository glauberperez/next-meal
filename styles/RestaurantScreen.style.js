import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      marginVertical: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    subtitle: {
      marginLeft: 20,
      marginVertical: 30,
      marginBottom: 5,
      fontSize: 16,
      color: '#963333',
    },
    carousel: {
      flex: 1,
    },
    description: {
      fontSize: 14,
      fontStyle: 'italic',
      color: 'grey',
      marginLeft: 20,
      marginBottom: 40,
    },
    image: {
      width: '10vw',
      height: '10vh',
    }
});
  
export default styles;