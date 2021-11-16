import './App.css'
import StickyNote from './StickyNote'
import Picture from './Picture'
import React from "react"
import { ReactSketchCanvas } from 'react-sketch-canvas'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = JSON.parse(window.localStorage.getItem('state')) || { 
            stickies: [], 
            pictures: [],
            canvasPaths: [],
            showAddPictureModal: false
        }
        this.canvas = React.createRef()
    }

    setState(state) {
        this.saveAllToLocalStorage()
        super.setState(state)
    }
    
    componentDidMount(){
        this.canvas.current.loadPaths(this.state.canvasPaths)
    }

    componentDidUpdate(){
        this.saveAllToLocalStorage()
    }

    saveAllToLocalStorage(){
        window.localStorage.setItem('state', JSON.stringify(this.state))
    }

    getLastStickyNoteId(){
        var currentId = 0
        if (this.state.stickies.length > 0){
            currentId = this.state.stickies.at(-1).id
        }
        return currentId
    }

    getRandomIntegerBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    addStickyNote(){
        let notes = [ ...this.state.stickies ]
        let newNote = {
            content: 'New Note',
            id: this.getLastStickyNoteId()+1,
            editing: true,
            position: {x: this.getRandomIntegerBetween(10, 30), y: this.getRandomIntegerBetween(10, 30)},
            color: '#ffc107'
        }
        notes.push(newNote)
        this.setState({stickies: notes})
    }

    removeStickyNote(id){
        let notes = this.state.stickies.filter(note => note.id !== id)
        this.setState({stickies: notes})
    }

    updateStickyNote = (id, newContent, newColor) => {
        let notes = [ ...this.state.stickies ]
        let oldNote = notes.find((note) => note.id === id)
        oldNote.content = newContent
        oldNote.color = newColor
        oldNote.editing = false
        this.setState({stickies: notes})
    }

    setStickyNoteToEditMode = (id) => {
        let notes = [ ...this.state.stickies ]
        let oldNote = notes.find((note) => note.id === id)
        oldNote.editing = true
        this.setState({stickies: notes})
    }

    updateStickyNoteLocation = (id, x, y) => {
        let notes = [ ...this.state.stickies ]
        let noteToUpdate = notes.find((note) => note.id === id)
        noteToUpdate.position = {x: x, y: y}
        this.setState({stickies: notes})
    }

    clearStickyNotes(){
        this.setState({stickies: []})
    }

    clearDrawings(){
        this.canvas.current.resetCanvas()
    }

    clearPictures(){
        this.setState({pictures: []})
    }

    clearAll(){
        this.clearStickyNotes()
        this.clearDrawings()
        this.clearPictures()
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
        if (event.target.imageFile.files && event.target.imageFile.files[0]) {
            let images = [ ...this.state.pictures ]
            let newImage = {
                id: this.getLastPictureId()+1, 
                picture: URL.createObjectURL(event.target.imageFile.files[0]),
                position: {x: this.getRandomIntegerBetween(10, 30), y: this.getRandomIntegerBetween(10, 30)},
            }
            images.push(newImage)
            this.setState({pictures: images})
        }
        this.closeAddPictureModal()
        event.preventDefault()
    }

    getLastPictureId(){
        var currentId = 0
        if (this.state.pictures.length > 0){
            currentId = this.state.pictures.at(-1).id
        }
        return currentId
    }

    updatePictureLocation = (id, x, y) => {
        let images = [ ...this.state.pictures ]
        let imageToUpdate = images.find((image) => image.id === id)
        imageToUpdate.position = {x: x, y: y}
        this.setState({pictures: images})
    }
    
    removePicture(id){
        let images = this.state.pictures.filter(pic => pic.id !== id)
        this.setState({pictures: images})
    }

    saveCanvasPaths = () => {
        this.canvas.current.exportPaths()
            .then(result => this.setState({canvasPaths: result}))
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
                        <Button variant="outline-light" className='me-2' onClick={() => this.setEraserMode(false)}>Pen Mode</Button>
                        <Button variant="outline-light" className='me-2' onClick={() => this.setEraserMode(true)}>Erase Mode</Button>
                        <Button variant="outline-light" onClick={() => this.clearAll()}>Clear All</Button>
                    </Nav>
                </Container>
            </Navbar>
            <Container fluid>
                    <Modal show={this.state.showAddPictureModal} onHide={this.closeAddPictureModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Adding Image to Canvas</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={this.addPicture}>
                            <Modal.Body>
                                Please browse your device for an image to add to the canvas
                                <Form.Control type="file" accept ="image/*" name='imageFile'/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeAddPictureModal}>Close</Button>
                                <Button variant="success" type="submit" onClick={this.showAddPictureModal}>Save Changes</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>

                    {this.state.stickies.map(
                        (sticky) => <StickyNote id ={sticky.id}
                                                content={sticky.content}
                                                editing={sticky.editing}
                                                key={sticky.id} 
                                                position={sticky.position}
                                                color={sticky.color}
                                                onChange={this.updateStickyNote}
                                                onRemove={() => this.removeStickyNote(sticky.id)}
                                                onEdit={this.setStickyNoteToEditMode}
                                                onStop={this.updateStickyNoteLocation}/>
                                                )}
                    
                    {this.state.pictures.map(
                        (image) => <Picture id={image.id} 
                                            key={image.id} 
                                            picture={image.picture} 
                                            position={image.position}
                                            onRemove={() => this.removePicture(image.id)}
                                            onStop={this.updatePictureLocation}/>)}
                    
                    <ReactSketchCanvas  ref={this.canvas}
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
                                        onChange={this.saveCanvasPaths}/>               
            </Container>
        </>
    }
}
