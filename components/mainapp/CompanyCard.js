import React from 'react';
import { View, Text, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import Line from '../shared/Line';
import { typefaces } from '../../utils/styles';
import { getLogoByPath } from '../../utils/mocks';
import Ripple from 'react-native-material-ripple';

function CompanyCard({ total, company, onPress }) {
   return (
      <Ripple onPress={onPress} style={tailwind('m-2')} rippleDuration={300}>
         <View
            style={[
               tailwind(
                  'bg-white w-24 rounded-md items-center py-2 px-3 border border-gray-300',
               ),
               { height: 128 },
            ]}
         >
            <Image
               source={getLogoByPath(company.company_logo_path)}
               style={{ width: 48, height: 48 }}
            />
            <Line style={tailwind('bg-gray-300 w-full mt-2 mb-1')} />
            <View>
               <Text style={[tailwind('text-black text-base'), typefaces.psb]}>
                  {company.business_name}
               </Text>
               <View style={tailwind('flex flex-row')}>
                  <Text style={[tailwind('text-gray-700 text-xs mr-1'), typefaces.pm]}>
                     Saldo:
                  </Text>
                  <Text style={[tailwind('text-green-600 text-xs'), typefaces.pm]}>
                     ${total}
                  </Text>
               </View>
            </View>
         </View>
      </Ripple>
   );
}

export default CompanyCard;
