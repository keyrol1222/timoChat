import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white">
      <View className="space-y-2">
        <Text
          style={{
            fontSize: wp(10),
          }}
          className="font-bold text-center text-gray-800">
          Timo
        </Text>
        <Text
          style={{
            fontSize: wp(4),
          }}
          className="font-semibold text-center text-gray-600 tracking-wider">
          Ask timo everything
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Image
          source={require('../../assests/img/logo.png')}
          style={{
            width: wp(75),
            height: wp(75),
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="bg-emerald-500 rounded-2xl mx-5 p-4">
        <Text
          style={{
            fontSize: wp(6),
          }}
          className="text-white font-bold text-center">
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
