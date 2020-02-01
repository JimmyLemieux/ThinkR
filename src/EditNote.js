import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';


class EditNote extends React.Component {

    constructor(props) {
        super(props); 

        const {noteTitle, noteContents, noteID} = this.props;

        this.state = {
            noteTitle: noteTitle,
            noteContents: noteContents,
            noteID: noteID,
            shouldSend: 0   // Used to display the prompt text
        }

        this.changeTitle = this.changeTitle.bind(this);
        this.changeNoteContents = this.changeNoteContents.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }

    // Able to receive the new props sent into this component
    // Due to the setState in the parent component

    componentWillReceiveProps(newProps) {
        this.setState({
            noteTitle: newProps.noteTitle,
            noteContents: newProps.noteContents,
            noteID: newProps.noteID
        });
    }

    // For The input fields

    changeTitle(event) {
        this.setState({
            noteTitle: event.target.value
        });
    }

    changeNoteContents(event) {
        this.setState({
            noteContents: event.target.value
        });
    }


    // This will submit our form and call the prop saveNote to call the parents save functionality
    submitForm(event) {
        const {saveNote} = this.props;
        event.preventDefault();
        if (this.state.noteTitle && this.state.noteContents) {
            this.setState({shouldSend: 1});
            saveNote(this.state.noteTitle, this.state.noteContents, this.state.noteID);
        }
        else
            this.setState({shouldSend: 0});
    }

    // Render the JSX
    render() {
        return(
            <Form onSubmit={this.submitForm}>
                {
                !this.state.shouldSend ? <h5 style={{color: "red"}}> Please Fill out Title and contents </h5> : <h5 style={{color: "green"}}> Note Recorded to your Archive</h5>
                
                }
                <FormGroup controlId="exampleForm.ControlInput1">
                    <FormLabel>Note Title</FormLabel>
                    <FormControl type="text" placeholder="The best day ever!" onChange={this.changeTitle} value={this.state.noteTitle}></FormControl>
                </FormGroup>
                <FormGroup controlId="exampleForm.ControlTextArea1">
                    <FormLabel>Note Contents</FormLabel>
                    <FormControl as="textarea" rows="5" placeholder="Today was awesome.." onChange={this.changeNoteContents} value={this.state.noteContents}></FormControl>
                </FormGroup>
                <Button type="submit">
                    Submit
                </Button>
            </Form>

        );
    }
}
export default EditNote;