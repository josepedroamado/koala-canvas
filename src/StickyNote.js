import Draggable from 'react-draggable';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'

export default class StickyNote extends React.Component {
    remove = () => {
        this.props.onRemove(this.props.id);
    }

    update = (event) => {
        this.props.onChange(this.props.id, event.target.noteText.value, event.target.noteColor.value);
        event.preventDefault();
    }

    setEditMode = () => {
        this.props.onEdit(this.props.id);
    }

    renderEditing() { 
        return <>
        <Draggable  position={{x: this.props.position.x, y: this.props.position.y}}
                    onStop={(e, data) => {this.savePosition(data.x, data.y)}}>
            <Card 
                style={{
                    width: '16rem', 
                    height: '14rem',
                    position: 'absolute',
                    backgroundColor: this.props.color    
                }}
                className="mb-2 shadow">
                <Card.Header>
                    <Stack direction="horizontal" gap={3}>
                        <CloseButton className="me-auto" onClick={this.remove}/>
                    </Stack>
                </Card.Header>
                <Card.Body>  
                        <Form onSubmit={this.update}>
                            <Form.Control as="textarea" rows={3} name="noteText" defaultValue={this.props.content} />
                            <br/>
                            <Stack direction="horizontal" gap={3}>
                                <Form.Control
                                    type="color"
                                    name="noteColor"
                                    defaultValue="#ffc107"
                                    className='me-auto'
                                />
                                <Button variant="outline-dark" type="submit" className='ms-auto'>
                                    Save
                                </Button>
                            </Stack>                          
                        </Form>
                </Card.Body>
            </Card>
        </Draggable>
        </>
    }

    savePosition = (x, y) => {
        this.props.onStop(this.props.id, x, y)
    }

    renderDisplaying() { 
        return <>
        <Draggable  position={{x: this.props.position.x, y: this.props.position.y}}
                    onStop={(e, data) => {this.savePosition(data.x, data.y)}}>
            <Card 
                style={{
                    width: '16rem', 
                    height: '14rem',
                    position: 'absolute',
                    backgroundColor: this.props.color    
                }}
                className="mb-2 shadow">    
                <Card.Header>
                    <Stack direction="horizontal" gap={3}>
                        <CloseButton className="me-auto" onClick={this.remove}/>
                        <Button className="ms-auto" variant="outline-dark" size="sm" onClick={this.setEditMode}>Edit</Button>
                    </Stack>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {this.props.content}
                    </Card.Text>               
                </Card.Body>
            </Card>
        </Draggable>
        </>
    }

    render() {
        if (this.props.editing) {
            return this.renderEditing();
        }
        else {
            return this.renderDisplaying();
        }
    }
}