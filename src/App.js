import './App.css';
import StickyNote from './StickyNote';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React from "react";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            stickies: [], 
            showAddPictureModal: false, 
            pictures: [] 
        }
        this.canvas = React.createRef()
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

    clearStickyNotes(){
        this.setState({stickies: []});
    }

    clearDrawings(){
        this.canvas.current.resetCanvas()
    }

    setEraserMode(value){
        this.canvas.current.eraseMode(value)
    }

    closeAddPictureModal = () => {
        this.setState({showAddPictureModal: false})
    }

    showAddPictureModal = () => {
        this.setState({showAddPictureModal: true})
    }

    addPicture = (event) => {
        console.log(event.target.imageFile.value)
    }

    render() {
        return <>
        <Navbar bg="success" variant="dark" className='shadow-sm'>
            <Container>
                <Navbar.Brand> 
                    Koala Canvas
                </Navbar.Brand>         
                <Nav className="justify-content-end">
                    <Button variant="outline-light" className='me-2' onClick={this.showAddPictureModal}>
                        Add Picture
                    </Button>
                    <Button variant="outline-light" className='me-2' onClick={() => this.addStickyNote()}>Add a Note</Button>
                    <Button variant="outline-light" className='me-2' onClick={() => this.clearStickyNotes()}>Clear Sticky Notes</Button>
                    <Button variant="outline-light" className='me-2' onClick={() => this.setEraserMode(false)}>Pen Mode</Button>
                    <Button variant="outline-light" className='me-2' onClick={() => this.setEraserMode(true)}>Erase Mode</Button>
                    <Button variant="outline-light" onClick={() => this.clearDrawings()}>Clear Canvas</Button>
                </Nav>
            </Container>
        </Navbar>
        <Container fluid>
                    <Modal show={this.state.showAddPictureModal} onHide={this.closeAddPictureModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Browse for an image to upload</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={this.addPicture}>
                            <Modal.Body>
                                Please browse your device for an image to upload
                                <Form.Control type="file" name='imageFile'/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeAddPictureModal}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" onClick={this.showAddPictureModal}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
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
                                        )}
                
                    <ReactSketchCanvas
                        ref={this.canvas}
                        style={{
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            left: '0px',
                            overflow: 'hidden',
                            zIndex: -1
                        }}
                        strokeWidth={4}
                        eraserWidth={40}
                        strokeColor="blue"
                        />
                
        </Container>
        </>
    }
}
