import './App.css';
import StickyNote from './StickyNote';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React from "react";

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stickies: [
                {content: 'Note 1', id: 0, editing: false, position: {x: 10, y: 10}, color: '#ffc107'}, 
                {content: 'Note 2', id: 1, editing: true, position: {x: 10, y: 10}, color: '#ffc107'}
            ]
        }
    }

    getCurrentId(){
        var currentId = 0;
        if (this.state.stickies.length > 0){
            currentId = this.state.stickies.at(-1).id;
        }
        return currentId;
    }

    randomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    addStickyNote(){
        let notes = [ ...this.state.stickies ];
        let newNote = {
            content: 'New Note',
            id: this.getCurrentId()+1,
            editing: true,
            position: {x: this.randomInteger(10, 30), y: this.randomInteger(10, 30)},
            color: '#ffc107'
        }
        notes.push(newNote);
        this.setState({stickies: notes});
    }

    removeStickyNote(id){
        let notes = this.state.stickies.filter(note => note.id !== id)
        this.setState({stickies: notes});
    }

    updateStickyNote = (id, newContent, newColor) => {
        let notes = [ ...this.state.stickies ];
        let oldNote = notes.find((note) => note.id === id)
        oldNote.content = newContent
        oldNote.color = newColor
        oldNote.editing = false
        this.setState({stickies: notes});
    }

    setNoteToEdit = (id) => {
        let notes = [ ...this.state.stickies ];
        let oldNote = notes.find((note) => note.id === id)
        oldNote.editing = true
        this.setState({stickies: notes});
    }

    updateStickyNoteLocation = (id, x, y) => {
        let notes = [ ...this.state.stickies ];
        let noteToUpdate = notes.find((note) => note.id === id)
        noteToUpdate.position = {x: x, y: y}
        this.setState({stickies: notes})
    }

    clearCanvas(){
        this.setState({stickies: []});
    }

    render() {
        return <>
        <Navbar bg="success" variant="dark" className='shadow-sm'>
            <Container>
                <Navbar.Brand> 
                    Koala Canvas
                </Navbar.Brand>         
                <Nav className="justify-content-end">
                    <Button variant="outline-light" className='me-2' onClick={() => this.addStickyNote()}>Add a Note</Button>
                    <Button variant="outline-light" onClick={() => this.clearCanvas()}>Clear Canvas</Button>
                </Nav>
            </Container>
        </Navbar>
        {this.state.stickies.map(
            (sticky) => <StickyNote 
                            id ={sticky.id}
                            content={sticky.content}
                            editing={sticky.editing}
                            key={sticky.id} 
                            position={sticky.position}
                            color={sticky.color}
                            onChange={this.updateStickyNote}
                            onRemove={() => this.removeStickyNote(sticky.id)}
                            onEdit={this.setNoteToEdit}
                            onStop={this.updateStickyNoteLocation}/>
                            )
        }
        </>
    }
}
