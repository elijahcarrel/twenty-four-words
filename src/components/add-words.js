// 'use strict';
//
// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   FlatList,
//   View,
//   Text,
//   ActivityIndicator,
//   TextInput,
//   TouchableOpacity
// } from 'react-native';
//
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
//
// import * as Actions from '../actions'; // Import your actions
//
// class AddWords extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       inputWord: "",
//     };
//
//     this.renderItem = this.renderItem.bind(this);
//     this.addWordFromInput = this.addWordFromInput.bind(this);
//   }
//
//   addWordFromInput() {
//     this.props.addWord(this.state.inputWord.trim());
//     this.setState({ inputWord: "" });
//   }
//
//   // handleTextChange(inputWord) {
//   //   this.setState({inputWord: inputWord});
//   // }
//
//   // componentDidMount() {
//   //   this.props.getData(); // Call our action
//   // }
//
//   render() {
//     if (this.props.loading) {
//       return (
//         <View style={styles.activityIndicatorContainer}>
//           <ActivityIndicator animating={true}/>
//         </View>
//       );
//     } else {
//       return (
//         <View style={styles.bodyContainer}>
//           <Text style={styles.h1}>Add words to the pot.</Text>
//           <View style={styles.wordInputContainer}>
//             <TextInput
//               style={styles.wordInput}
//               textAlign={'center'}
//               autoFocus
//               onChangeText={(inputWord) => this.setState({inputWord})}
//               onSubmitEditing={this.addWordFromInput}
//               value={this.state.inputWord}
//               blurOnSubmit={false}
//             />
//           </View>
//           <Text style={styles.h2}>Words can be anything: people, places, things, inside jokes, etc.</Text>
//           <TouchableOpacity onPress={this.addWordFromInput}>
//             <View style={styles.button}>
//               <Text style={styles.buttonText}>Add Word</Text>
//             </View>
//           </TouchableOpacity>
//           <FlatList
//             ref='listRef'
//             data={this.props.words}
//             renderItem={this.renderItem}
//             keyExtractor={ (item, index) => index.toString() }
//           />
//         </View>
//       );
//     }
//   }
//
//   renderItem({item, index}) {
//     return (
//       <View style={styles.row} textAlign={'center'}>
//         <Text style={styles.wordInRow}>
//           {item}
//         </Text>
//       </View>
//     )
//   }
// };
//
//
//
// // The function takes data from the app current state,
// // and insert/links it into the props of our component.
// // This function makes Redux know that this component needs to be passed a piece of the state
// function mapStateToProps(state, props) {
//   return {
//     loading: state.dataReducer.loading,
//     // data: state.dataReducer.data,
//     words: state.dataReducer.words,
//   }
// }
//
// // Doing this merges our actions into the component’s props,
// // while wrapping them in dispatch() so that they immediately dispatch an Action.
// // Just by doing this, we will have access to the actions defined in out actions file (action/add-words.js)
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(Actions, dispatch);
// }
//
// // Connect everything
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
//
// const styles = StyleSheet.create({
//   activityIndicatorContainer: {
//     backgroundColor: "#fff",
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   },
//
//   row: {
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     padding: 5,
//   },
//
//   wordInRow: {
//     fontSize: 16,
//   },
//
//   h1: {
//     fontSize: 20,
//     fontWeight: "600",
//     marginTop: 10,
//   },
//
//   h2: {
//     marginTop: 5,
//     fontSize: 14,
//   },
//
//   button: {
//     marginTop: 10,
//     marginBottom: 30,
//     width: 260,
//     alignItems: 'center',
//     backgroundColor: '#2196F3',
//   },
//
//   buttonText: {
//     padding: 20,
//     color: 'white',
//     fontSize: 16,
//   },
//
//   headerText: {
//     paddingTop: 20,
//     fontSize: 30,
//     fontWeight: 'bold',
//   },
//
//   bodyContainer: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     padding: 20,
//     alignItems: 'center',
//   },
//
//   wordInput: {
//     height: 35,
//     width: 200,
//     fontSize: 30,
//   },
//
//   wordInputContainer: {
//     padding: 20,
//   }
// });
