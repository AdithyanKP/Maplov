import React from 'react';
import {StatusBar, View, Text, Image, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Instagram = () => {
  const stories = [
    {
      id: 1,
      image: require('../Components/src/assets/me.png'),
    },
    {
      id: 2,
      image: require('../Components/src/assets/download.jpg'),
    },
  ];

  const renderStories = ({item, index}) => {
    return (
      /*  <LinearGradient
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        colors={['#CA1D7E', '#E35157', '#F2703f']}
        style={{
          height: 82,
          width: 82,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 82 / 2,
        }}>
        <Image
          source={{uri: item.image}}
          style={{
            width: 75,
            height: 75,
            borderRadius: 75 / 2,
            alignSelf: 'center',
            borderColor: '#fff',
            borderWidth: 3,
          }}
        />
      </LinearGradient> */
      <LinearGradient
        colors={['#CA1D7E', '#E35157', '#F2703F']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={{
          height: 82,
          width: 82,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 82 / 2,
          marginLeft: 10,
        }}>
        <Image
          source={item.image}
          style={{
            width: 75,
            height: 75,
            borderRadius: 75 / 2,
            padding: 20,
          }}
        />
      </LinearGradient>
    );
  };
  return (
    <>
      {/*  header */}

      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar backgroundColor="#000" barStyle="Light-content" />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          {/* <Text
            style={{
              color: 'black',
              fontSize: 30,
              fontFamily: '',
              fontWeight: 'bold',
            }}>
            Instagram
          </Text> */}
          <Image
            source={require('../Components/src/assets/insta2.png')}
            style={{width: 30, height: 30}}
          />

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
        <View style={{flexDirection: 'row'}}>
          <FlatList
            data={stories}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}
            renderItem={renderStories}
          />
        </View>
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
