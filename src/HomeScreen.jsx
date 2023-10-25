// Store/Retrieve Files on Google Drive using React Native App
// https://aboutreact.com/react-native-google-drive/

// Import React in our code
import React, {useState, useEffect} from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// For Google Signin
import {GoogleSignin} from 'react-native-google-signin';

const HomeScreen = ({navigation, route}) => {
  //route.params.userInfo
  // State Defination
  const [userInfo, setUserInfo] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={_signOut}>
          <Text style={{marginRight: 10, color: 'white'}}>
            Logout
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setUserInfo(route.params.userInfo);
  }, []);

  // To sign out from Google Login
  const _signOut = async () => {
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
      navigation.replace('GoogleLoginScreen');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <>
          <View style={{flexDirection: 'row'}}>
            {userInfo ? (
              <Image
                source={{uri: userInfo.user.photo}}
                style={styles.imageStyle}
              />
            ) : null}
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>
                User Name: {userInfo ? userInfo.user.name : ''}
              </Text>
              <Text style={styles.text}>
                Use Email: {userInfo ? userInfo.user.email : ''}
              </Text>
            </View>
          </View>
          <ScrollView>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                navigation.navigate('GDUploadFileScreen')
              }>
              <Text>Select and Upload File on Google Drive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                navigation.navigate(
                  'GDFilesListingScreen',
                  {type: 'all'}
                )
              }>
              <Text>Listing of Files from Google Drive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                navigation.navigate(
                  'GDFilesListingScreen',
                  {type: 'filtered'}
                )
              }>
              <Text style={{textAlign: 'center'}}>
                Get Specific File Content from Google Drive
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                navigation.navigate('GDSingleFileScreen')
              }>
              <Text style={{textAlign: 'center'}}>
                Get Single File Content from Google Drive
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                navigation.navigate('GDDeleteFileScreen')
              }>
              <Text>Delete any File from Google Drive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                navigation.navigate('GDDownloadFileScreen')
              }>
              <Text>Download File from Google Drive</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
        <Text style={styles.footerHeading}>
          Store/Retrieve Files on Google Drive
        </Text>
        <Text style={styles.footerText}>www.aboutreact.com</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
});