import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


class NoteTableItem extends React.Component {

    constructor(props) {
        super(props);

        const {name, date, contents, id} =  this.props;
        this.state = {
            id: id,
            name: name,
            date: date,
            contents: contents
        }

        this.onDelete = this.onDelete.bind(this);
        this.onView = this.onView.bind(this);

    }

    // Used to update props sent from parent component
    componentWillReceiveProps(newProps) {
        this.setState({
            id: newProps.id,
            name: newProps.name,
            date: newProps.date, 
            contents: newProps.contents
        });
    }

    onDelete() {
        const {onDelete} = this.props;
        onDelete(this.state.id);
    }

    onView() {
        const {onView} = this.props;
        onView(this.state.name, this.state.contents, this.state.id);
    }

    render() {
        return (
            <tr>
                <td>{this.state.id}</td>
                <td>{this.state.name}</td>
                <td>{this.state.date}</td>
                <td><Button onClick={this.onView}>View</Button></td>
                <td><Button onClick={this.onDelete}>Delete</Button></td>
            </tr>
        );
    }
}

export default NoteTableItem;