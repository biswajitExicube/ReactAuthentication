import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/component/common';
import LoginForm from './src/component/LoginForm';

/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});*/

class App extends Component {

  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCsKwXWw78T1jDxgi5E73SCB-0X_eY3Bvg',
      authDomain: 'reactnative-project.firebaseapp.com',
      databaseURL: 'https://reactnative-project.firebaseio.com',
      projectId: 'reactnative-project',
      storageBucket: 'reactnative-project.appspot.com',
      messagingSenderId: '946837396395'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({ loggedIn: true });
      }else{
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn){
      case true:
        return (
        <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
       );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }

    /*if(this.state.loggedIn){
      return (
        <Button>
          Log out
        </Button>
      )
    }
    return <LoginForm />*/
  }

  render() {
    return (
      <View>
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
