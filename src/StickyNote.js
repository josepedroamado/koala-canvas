import Draggable from 'react-draggable';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';

function StickyNote(props) {
  return <>
    <Draggable>
        <Card 
            bg='warning'
            style={{ width: '16rem', height: '14rem'}}
            className="mb-2 shadow">
            <Card.Body>
                <CloseButton className="float-right"/>
                <Card.Text>
                    {props.content}
                </Card.Text>               
            </Card.Body>
        </Card>
    </Draggable>
    </>
}

export default StickyNote;
