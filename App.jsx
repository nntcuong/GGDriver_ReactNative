// App.js
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GoogleSignin} from 'react-native-google-signin';
import GDUploadFileScreen from './src/googleDrivescreens/GDUploadFileScreen';
import GDFilesListingScreen from './src/googleDrivescreens/GDFilesListingScreen';
import GDSingleFileScreen from './src/googleDrivescreens/GDSingleFileScreen';
import GDDeleteFileScreen from './src/googleDrivescreens/GDDeleteFileScreen';
import GDDownloadFileScreen from './src/googleDrivescreens/GDDownloadFileScreen';

const APP_DIRECTORY = 'AboutReactAppExample';

const Stack = createStackNavigator();

const GoogleLoginScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive'],
      webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      loginHint: '',
      forceCodeForRefreshToken: true,
      accountName: '',
    });
  }, []);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      navigation.replace('HomeScreen', {userInfo: userInfo});
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonStyle} onPress={_signIn}>
          <Text style={styles.text}>Google Sign-In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const HomeScreen = ({navigation, route}) => {
  const [userInfo, setUserInfo] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={_signOut}>
          <Text style={{marginRight: 10, color: 'white'}}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setUserInfo(route.params.userInfo);
  }, []);

  const _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
      navigation.replace('GoogleLoginScreen');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // Remaining code of HomeScreen...
  );
};

// Remaining code for other screens...

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GoogleLoginScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="GoogleLoginScreen"
          component={GoogleLoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Google Drive Example'}}
        />
        <Stack.Screen
          name="GDUploadFileScreen"
          component={GDUploadFileScreen}
          options={{title: 'Upload File'}}
        />
        <Stack.Screen
          name="GDFilesListingScreen"
          component={GDFilesListingScreen}
          options={{title: 'Files'}}
        />
        <Stack.Screen
          name="GDSingleFileScreen"
          component={GDSingleFileScreen}
          options={{title: 'File Content'}}
        />
        <Stack.Screen
          name="GDDeleteFileScreen"
          component={GDDeleteFileScreen}
          options={{title: 'Delete File'}}
          />
          <Stack.Screen
            name="GDDownloadFileScreen"
            component={GDDownloadFileScreen}
            options={{title: 'Download File'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      );
    };
    
    const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    },
    imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 16,
    },
    buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
    },
    footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
    },
    footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
    },
    text: {
    fontSize: 16,
    textAlign: 'center',
    },
    });
    
    export default App;