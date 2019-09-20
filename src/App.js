import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {Header, Button, Spinner, CardSection, Card} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {loggedIn: null};
  componentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCXm6umhipPnD_vhVozb4KuXhO3TxuGiwY',
      authDomain: 'authentication-52d1c.firebaseapp.com',
      databaseURL: 'https://authentication-52d1c.firebaseio.com',
      projectId: 'authentication-52d1c',
      storageBucket: '',
      messagingSenderId: '53594566417',
      appId: '1:53594566417:web:f810a945b940cc7f8c66b0',
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.spinnerStyle}>
            <Spinner />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  spinnerStyle: {
    paddingTop: 350,
  },
};

export default App;
