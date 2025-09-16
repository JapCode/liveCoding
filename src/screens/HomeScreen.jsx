import { StyleSheet, View } from 'react-native';
import CustomInput from '../components/CustomInput';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CustomInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
