import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Features() {
  return (
    <View style={{height: hp(60)}} className="space-y-4">
      <Text style={{fontSize: wp(6.5)}} className="font-semibold text-gray-700">
        Features
      </Text>
      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require('../../assests/img/chatgptIcon.png')}
            style={{height: hp(4), width: hp(4)}}
          />
          <Text
            className="text-gray-700 font-semibold"
            style={{fontSize: wp(4.6)}}>
            ChatGPT
          </Text>
        </View>
        <Text className="text-gray-700 font-medium" style={{fontSize: wp(3.6)}}>
          ChatGPT is a chatbot that can answer your questions. It is trained on
          a large dataset of conversations and can answer a wide variety of
          questions.
        </Text>
      </View>
      <View className="bg-purple-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require('../../assests/img/dalleIcon.png')}
            style={{height: hp(4), width: hp(4)}}
          />
          <Text
            className="text-gray-700 font-semibold"
            style={{fontSize: wp(4.6)}}>
            Dall-I
          </Text>
        </View>
        <Text className="text-gray-700 font-medium" style={{fontSize: wp(3.6)}}>
          Dall-I is a chatbot that can answer your questions. It is trained on a
          large dataset of conversations and can answer a wide variety of
          questions.
        </Text>
      </View>
      <View className="bg-cyan-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require('../../assests/img/smartaiIcon.png')}
            style={{height: hp(4), width: hp(4)}}
          />
          <Text
            className="text-gray-700 font-semibold"
            style={{fontSize: wp(4.6)}}>
            SMART AI
          </Text>
        </View>
        <Text className="text-gray-700 font-medium" style={{fontSize: wp(3.6)}}>
          SMART AI is a chatbot that can answer your questions. It is trained on
          a large dataset of conversations and can answer a wide variety of
          questions.
        </Text>
      </View>
    </View>
  );
}
