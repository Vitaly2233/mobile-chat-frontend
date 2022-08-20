import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import 'localstorage-polyfill';
import {StatusBar, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Arrow from './src/components/icons/Arrow';
import LinkText from './src/components/LinkText';
import SmallImage from './src/components/SmallImage';
import TabHeader from './src/components/TabHeader';
import {IChat} from './src/models/chat';
import Chat from './src/screens/Chat';
import Chats from './src/screens/Chats';
import {useStore} from './src/store';
import {Themes} from './src/themes';
import Login from './src/screens/Login';
import {observer} from 'mobx-react-lite';

const Stack = createNativeStackNavigator();

const App = () => {
  const {userStore} = useStore();

  const defaultImageUri =
    'https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg';

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('dark-content');
    StatusBar.setTranslucent(true);

    try {
      let token = await AsyncStorage.getItem('access_token');
      if (!token) return;
      userStore.setToken(token);
      await userStore.setMe();
    } catch (e) {
      userStore.logout();
    }
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Themes.BACKGROUND_LIGHT_COLOR,
    },
  };

  const chatsHeader = ({route}: NativeStackHeaderProps) => (
    <TabHeader title={route.name} leftItem={<LinkText text="Edit" />} />
  );
  const chatHeader = ({route, navigation}: NativeStackHeaderProps) => {
    if (!route || !route.params) return <View></View>;
    const params = route.params as IChat;
    return (
      <TabHeader
        title={`${params.firstName} ${params.lastName}`}
        leftItem={<Arrow onPress={() => navigation.pop()} />}
        rightItem={<SmallImage uri={defaultImageUri} />}
      />
    );
  };
  const loginHeader = ({route, navigation}: NativeStackHeaderProps) => {
    return <TabHeader title={route.name} />;
  };

  return (
    <View style={styles.container}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          {!!userStore.user ? (
            <>
              <Stack.Screen
                name="Chats"
                component={Chats}
                options={{
                  header: chatsHeader,
                }}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{header: chatHeader}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{header: loginHeader}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.BACKGROUND_LIGHT_COLOR,
    paddingHorizontal: Themes.GLOBAL_HORIZONTAL_MARGIN,
    paddingTop: StatusBar.currentHeight,
  },
});

export default observer(App);
