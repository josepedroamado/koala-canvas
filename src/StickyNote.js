import Draggable from 'react-draggable';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function StickyNote({content}) {
  return <>
    <Draggable>
        <Card 
            bg='warning'
            style={{ width: '18rem' }}
            className="mb-2">
            <Card.Header>Note Title</Card.Header>
            <Card.Body>
                <Card.Text>
                {content}
                </Card.Text>
                <Button variant="outline-dark">Edit</Button>
            </Card.Body>
        </Card>
    </Draggable>
    </>
}

export default StickyNote;
