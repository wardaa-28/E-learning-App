import { StyleSheet } from 'react-native';
import newTheme from './Constants';

const Styles = StyleSheet.create({
  heading: { fontFamily: newTheme.semiBold, color: newTheme.black, fontSize: 22 },
  subHeading: { fontFamily: newTheme.medium,fontSize: 16, color: newTheme.black, },
  subTitle: { fontFamily: newTheme.regular, fontSize: 16, color: newTheme.black },
  justify: { justifyContent: 'center', alignItems: 'center' },
  title: { fontFamily: newTheme.medium, fontSize: 18, color: newTheme.grey },
  row: { flexDirection: 'row' },
  box: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  linearBox: { justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 8, width: '95%', },
  main: { flex: 1, backgroundColor: newTheme.white, padding: 8 },
  textBox: { color: newTheme.black, fontSize: 24, fontFamily: newTheme.semiBold },
  image: { width: '100%', height: 100 },
});
export default Styles;
