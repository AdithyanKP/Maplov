import React from 'react';
import {StatusBar, View, Text, Image} from 'react-native';
const Instagram = () => {
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar backgroundColor="#000" barStyle="Light-content" />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              fontFamily: 'verdana',
            }}>
            Instagram
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '20%',
              marginRight: 2,
            }}>
            <Image
              source={require('../Components/src/assets/messenger.png')}
              style={{width: 27, height: 27}}
            />
            <Image
              source={require('../Components/src/assets/more2.png')}
              style={{width: 27, height: 27}}
            />
          </View>
        </View>
        <View style={{backgroundColor: 'white', padding: 10}}></View>
        <View style={{backgroundColor: 'white', flex: 1, padding: 20}}></View>

        {/* //footer// */}
        <View
          style={{
            backgroundColor: 'white',
            padding: 13,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '22%',
            }}>
            <Image
              source={require('../Components/src/assets/messenger.png')}
              style={{width: 27, height: 27}}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '22%',
            }}>
            <Image
              source={require('../Components/src/assets/search2.png')}
              style={{width: 27, height: 27}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '22%',
            }}>
            <Image
              source={require('../Components/src/assets/reels3.png')}
              style={{width: 27, height: 27}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '22%',
            }}>
            <Image
              source={require('../Components/src/assets/love2.png')}
              style={{width: 27, height: 27}}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default Instagram;
