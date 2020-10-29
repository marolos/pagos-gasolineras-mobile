import React from 'react';
import Ripple from 'react-native-material-ripple';
import { cities } from '../../utils/mocks';
import { View, Text, TextInput } from 'react-native';
import tailwind from 'tailwind-rn';
import { typefaces, shadowStyle } from '../../utils/styles';

export default function CitySelect({ onChange, defaultValue, editable = true }) {
   const [text, setText] = React.useState('');
   const [hasErrors, setHasErrors] = React.useState(false);
   const [show, setShow] = React.useState(false);
   const data = cities.filter((city) => city.name.toLowerCase().includes(text.toLowerCase()));
   function valid(text) {
      return cities.find((item) => item.name.toLowerCase() === text.toLowerCase());
   }
   React.useEffect(() => {
      onChange(text);
   }, [text]);

   return (
      <View>
         <TextInput
            defaultValue={defaultValue}
            editable={editable}
            placeholder="Ciudad"
            onEndEditing={(e) => setShow(false)}
            style={[
               styles.input.main,
               show ? styles.input.show : styles.input.noShow,
               hasErrors ? styles.input.errors : {},
               typefaces.pm,
            ]}
            onChangeText={(t) => {
               setHasErrors(!valid(t));
               setText(t);
               setShow(true);
            }}
            onFocus={(e) => setShow(true)}
         />
         {show && (
            <View style={styles.list.view}>
               {data.map((city, i) => (
                  <Ripple
                     key={i + 'cl'}
                     onPress={() => {
                        setText(city.name);
                        setShow(false);
                        setHasErrors(false);
                     }}
                     style={styles.list.ripple}
                  >
                     <Text style={styles.list.text}>{city.name}</Text>
                  </Ripple>
               ))}
            </View>
         )}
      </View>
   );
}

const styles = {
   input: {
      main: tailwind('rounded-md border-2 border-gray-200 w-64 pl-5'),
      show: tailwind('bg-white border-2 border-gray-600'),
      noShow: tailwind('bg-gray-200'),
      errors: tailwind('bg-white border-2 border-red-400'),
   },
   list: {
      view: [
         tailwind('absolute bg-white w-40 pl-4 py-2'),
         { top: 60, left: 94, zIndex: 20 },
         shadowStyle,
      ],
      ripple: tailwind('p-1'),
      text: [tailwind('text-sm'), typefaces.pr],
   },
};
