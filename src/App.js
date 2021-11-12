import './App.css';
import StickyNote from './StickyNote';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from "react";

function App() {
  const stickies = [{content: 'Note 1', id: 1}, {content: 'Note 2', id: 2}];

  const [stickyNotes, setStickyNotes] = useState(stickies);

  function addStickyNote(){
    var currentId = 1;
    if (stickyNotes.lastItem != undefined){
      currentId = stickyNotes.lastItem.id;
    }
    var newNote = {
      content: 'New Note',
      id: currentId+1
    };
    console.log(newNote);
  }
  return <>
    <Navbar bg="success" variant="dark" className='shadow-sm'>
      <Container>
          <Navbar.Brand> 
              Koala Canvas
          </Navbar.Brand>         
          <Nav className="justify-content-end">
            <Button onClick={() => addStickyNote()}>Add a Note</Button>
            <Nav.Link href="#">Clear Canvas</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    {stickyNotes.map((sticky) => <StickyNote content={sticky.content} key={sticky.id}/>)}
    </>
}

export default App;
