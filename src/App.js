import React, { Component } from 'react';
import './App.css';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import { DB_CONFIG } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';


export class App extends Component {
  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    if(!firebase.apps.length){
      this.app = firebase.initializeApp(DB_CONFIG);
    }
    this.database = firebase.database().ref().child('notes');
    this.state={
      notes :[],
    }
  }
componentWillMount(){
  const previousNotes = this.state.notes;
  this.database.on('child_added', snap => {
    previousNotes.push({
      id:snap.key,
      noteContent:snap.val().noteContent,
    })
    this.setState({
      notes:previousNotes
    })
  })
}

  addNote(note){
    this.database.push().set({ noteContent: note });
  }
  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading"> 
          React and Firebase TodoList
          </div>
        </div>
        <div className="notesBody">
       {
          this.state.notes.map((note) => {
            return(
              <Note noteContent={note.noteContent} noteId ={note.id} key={note.id}  />
            )
          })
         
       }
        </div>
       <div className="notesFooter">
        <NoteForm  addNote ={this.addNote} />
       </div>
       
      </div>
    )
  }
}

export default App
