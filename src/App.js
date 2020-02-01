import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Table, Button, Container, Row, Col } from 'react-bootstrap';
import NoteTableItem  from './Places/NoteTableItem';
import EditNote from './Places/EditNote';



class App extends React.Component {
  constructor(props) {
    super(props);

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const item = localStorage.getItem('notes');

    this.state = {
      date: date,
      notes: item ? JSON.parse(item) : [],
      currentNoteTitle : "",
      currentNoteContents : "",
      currentNoteID: 0
    }

    this.onDelete = this.onDelete.bind(this);
    this.populateTestDB = this.populateTestDB.bind(this);
    this.clearDataBase = this.clearDataBase.bind(this);
    this.viewNote = this.viewNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
  }

  populateTestDB() {

    localStorage.clear();
    const notes = [
      {
      id: 0,
      name: 'testName',
      date: new Date().getFullYear(),
      contents: 'This is a note'
      },
      {
        id: 1,
        name: 'anotherName',
        date: new Date().getFullYear(),
        contents: 'This is some note that I have taken'
      }
    
    ]
    localStorage.setItem('notes', JSON.stringify(notes));
    const jsonNotes = JSON.parse(localStorage.getItem('notes'));
    this.setState({notes: jsonNotes});
  }

  clearDataBase() {
    localStorage.clear();
    this.setState({notes: []});
  }

  // End of database helper methods
  

  // Helper to update objects in update note feature

  updateObject(id, name, date, contents) {
    return {id: id, name: name, date: date, contents: contents};

  }


  // Getter for getting current states notes list

  getNotes() {
    return this.state.notes;
  }


  // Deletes a note from the database and updates the state
  onDelete(noteId) {
    const notes = this.getNotes();
    const filteredNotes = notes.filter( note => {
      return note.id !== noteId
    });
    this.setState({notes: filteredNotes});
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
  }

  // Sent to the Edit Note to populate our state in parent component

  viewNote (noteName, noteContents, noteID) {
    this.setState({
      currentNoteTitle: noteName,
      currentNoteContents: noteContents,
      currentNoteID: noteID
    });
  }

  // Function that is sent as a prop to the EditNote Component
  saveNote(noteName, noteContents, updateId) {

    let notes = this.getNotes();

    const found = notes.find( note => note.name === noteName); 


    // If found update note at ID with new contents

    if (found) 
        notes[updateId] = this.updateObject(updateId, noteName, new Date().getFullYear(), noteContents);
    else 
      notes.push( this.updateObject(notes.length, noteName, new Date().getFullYear(), noteContents));
    
    // Replace current state with empty current note props
    this.setState(
      {
        notes: notes,
        currentNoteTitle: "", 
        currentNoteContents: "",
        currentNoteID: 0
      
      });
    
    localStorage.setItem('notes', JSON.stringify(notes));
  }

// Render our JSX
  render() {

    return (
      <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin />
      

      <Jumbotron>
        <h1> ThinkR </h1>
        <p> Taking notes on  {this.state.date}</p>
        <Button onClick={this.populateTestDB}>Populate Test DB</Button>
        <Button onClick={this.clearDataBase}>Clear Database</Button>
      </Jumbotron>

      <div className="noteTable">
        <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Date Created</th>
                  <th>View Note</th>
                  <th>Delete Note</th>
                </tr>  
              </thead>
              <tbody>
                {
                  this.state.notes.map(note => {
                    return (
                      <NoteTableItem key={note.id}
                        name={note.name}
                        date={note.date}
                        contents={note.contents}
                        id={note.id} 
                        onDelete={this.onDelete}
                        onView={this.viewNote}
                      />
                    );
                  })
                }
              </tbody>
            </Table> 

        </div>

         <hr></hr>

         <div className="EditNotes">
            <Container fluid>
                <Row>
                  <Col>
                    <h1>Edit Note</h1>
                    <EditNote
                      noteTitle={this.state.currentNoteTitle}
                      noteContents={this.state.currentNoteContents}
                      noteID={this.state.currentNoteID}
                      saveNote={this.saveNote}
                    />
                  </Col>
                </Row>
            </Container>
          </div>
      </div>
    );
  }
}


export default App;
