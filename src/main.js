import firebase from 'firebase';
import '../static/styles/main.scss';

// initialize firebase app
const config = {
  apiKey: 'AIzaSyBQx_97x9lVm79lBgwFSAT3y93PJXx56-w',
  authDomain: 'simplefirebaseapp-f40f9.firebaseapp.com',
  databaseURL: 'https://simplefirebaseapp-f40f9.firebaseio.com',
  projectId: 'simplefirebaseapp-f40f9',
  storageBucket: 'simplefirebaseapp-f40f9.appspot.com',
  messagingSenderId: '805687084550'
};
firebase.initializeApp(config);

const database = firebase.database();

// Listen for value events
const chat2msg1 = firebase.database().ref('messages/two/m1');
chat2msg1.on('value', (snapshot) => {
  console.log('Listen for value events', snapshot.val());
});

// Add data
const addMessageData = (chatID, msgID, name, message) => {
  const dbRef = firebase.database().ref('messages');
  const msgRef = dbRef.child(`${chatID}/${msgID}`);
  // .push create unique ID
  msgRef.set({
    name,
    message
  }).then(() => console.log(`Add chat: #${chatID}-${msgID}`));
};

// Update data
const updateMessageData = (chatID, msgID, name, message) => {
  firebase.database().ref(`messages/${chatID}/${msgID}`).set({
    name,
    message
  }).then(() => console.log(`Update chat: #${chatID}-${msgID}`));
};

updateMessageData('two', 'm1', 'Oliver', 'message #1 updated');
updateMessageData('two', 'm1', 'Ted', 'message #1 ted');

// Read data once
const readMessageData = (chatID, msgID) => {
  firebase.database().ref(`messages/${chatID}/${msgID}`)
    .once('value')
    .then(snapshot => console.log(`Read chat: #${chatID}-${msgID}`, snapshot.val()));
};

readMessageData('one', 'm2');

// Delete data
const deleteMessageData = (chatID, msgID) => {
  firebase.database().ref(`messages/${chatID}/${msgID}`)
    .remove()
    .then(() => console.log(`Delete chat: #${chatID}-${msgID}`));
};

addMessageData('one', 'm4', 'Carl', 'message #4 carl');
deleteMessageData('one', 'm4');
