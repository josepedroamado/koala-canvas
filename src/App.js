import './App.css';
import StickyNote from './StickyNote';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function App() {
  return <>
    <Navbar bg="success" variant="dark">
      <Container>
          <Navbar.Brand> 
              Koala Canvas
          </Navbar.Brand>
      </Container>
    </Navbar> 
    <StickyNote content='my content' className="handle"></StickyNote>
    </>
}

export default App;
