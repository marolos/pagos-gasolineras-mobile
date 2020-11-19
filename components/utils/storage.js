import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStorageItem(key = '') {
   try {
      const stringData = await AsyncStorage.getItem(key);
      if (!stringData) {
         throw Error('no data for: ' + key);
      }
      return JSON.parse(stringData);
   } catch (error) {
      throw Error('no data for: ' + key);
   }
}

export async function setStorageItem(key = '', value) {
   const stringData = JSON.stringify(value);
   try {
      await AsyncStorage.setItem(key, stringData);
      return true;
   } catch (error) {
      return false;
   }
}
