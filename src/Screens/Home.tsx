import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, { useRef } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Features from '../Components/Features';
import {dummyMessages} from '../Constants';
import Voice from '@react-native-community/voice';
import {apiCall} from '../Api/OpenAi';

export default function Home() {
  const [messages, setMessages] = React.useState([]);
  const [recording, setRecording] = React.useState(false);
  const [speaking, setSpeaking] = React.useState(false);
  const [result, setResult] = React.useState('');
  const [text, setText] = React.useState('');
  const scrollViewRef = useRef();

  const onSpeechStartHandler = e => {
    console.log('recording start');
  };
  const onSpeechEndHandler = e => {
    console.log('recording end');
  };
  const onSpeechResultsHandler = e => {
    console.log('speech:', e);
    setResult(e.value[0]);
  };
  const onSpeechErrorHandler = e => {
    console.log('');
  };

  const starRecording = async () => {
    setRecording(true);

    await Voice.start('en-GB');
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
      fetchResponse();
    } catch (error) {
      console.log('error', error);
    }
  };
  const fetchResponse = async () => {
    if (result.trim().length > 0) {
      // setLoading(true);
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      setMessages([...newMessages]);

      // scroll to the bottom of the view
      updateScrollView();

      // fetching response from chatGPT with our prompt and old messages
      apiCall(result.trim(), newMessages).then(res => {
        // setLoading(false);
        if (res.success) {
          setMessages([...res.data]);
          setResult('');
          updateScrollView();
        } else {
          Alert.alert('Error', res.msg);
        }
      });
    }
  };
  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated: true});
    }, 200);
  };
  const clear = () => {
    setMessages([]);
  };
  const stopSpeaking = () => {
    setSpeaking(false);
  };
  React.useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex-row justify-center">
          {/* <Image
            source={require('../../assests/img/logo.png')}
            style={{height: hp(15), width: hp(15)}}
          /> */}
        </View>
        {messages.length > 0 ? (
          <View className="flex-1 space-y-2">
            <Text
              className="text-gray-700 font-semibold ml-1"
              style={{fontSize: wp(5)}}>
              Assistant
            </Text>
            <View
              style={{height: hp(58)}}
              className="rounded-3xl bg-neutral-200 p-4">
              <ScrollView
                className="space-y-4"
                ref={scrollViewRef}
                style={{height: hp(58)}}
                showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => {
                  if (message.role === 'assistant') {
                    if (message.content.includes('https')) {
                      //is img
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View className="bg-emerald-200 rounded-xl rounded-tl-none p-2 ">
                            <Image
                              source={{uri: message.content}}
                              style={{height: wp(60), width: wp(60)}}
                              className="rounded-xl"
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                      );
                    } else {
                      return (
                        <View
                          key={index}
                          className="bg-emerald-200 rounded-xl rounded-tl-none p-2 "
                          style={{width: wp(70)}}>
                          <Text>{message.content}</Text>
                        </View>
                      );
                    }
                  } else {
                    //user input
                    return (
                      <View key={index} className="flex-row justify-end">
                        <View
                          className="bg-white rounded-xl rounded-tr-none p-2 "
                          style={{width: wp(70)}}>
                          <Text>{message.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}
        {/* <View className="flex justify-center items-center h-4 w-4">
          <TextInput onChangeText={() => {}} value={text} className="h-4 w-4"/>
        </View> */}
        {/* buttons */}
        <View className="flex justify-center items-center">
          {
            //if recording is true then show stop button
            recording ? (
              <TouchableOpacity
                className="rounded-full"
                onPress={stopRecording}>
                <Image
                  source={require('../../assests/img/voiceLoading.gif')}
                  style={{height: hp(10), width: hp(10)}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="rounded-full"
                onPress={starRecording}>
                <Image
                  source={require('../../assests/img/recordingIcon.png')}
                  style={{height: hp(10), width: hp(10)}}
                />
              </TouchableOpacity>
            )
          }
          {
            // if message list is greater than 0 show clear button
            messages.length > 0 ? (
              <TouchableOpacity
                className="rounded-3xl bg-neutral-400 p-2 absolute right-10"
                onPress={clear}>
                <Text className="text-white font-semibold">Clear</Text>
              </TouchableOpacity>
            ) : null
          }
          {
            // if message list is greater than 0 show clear button
            speaking ? (
              <TouchableOpacity
                className="rounded-3xl bg-red-400 p-2 absolute left-10"
                onPress={stopSpeaking}>
                <Text className="text-white font-semibold">Stop</Text>
              </TouchableOpacity>
            ) : null
          }
        </View>
      </SafeAreaView>
    </View>
  );
}
