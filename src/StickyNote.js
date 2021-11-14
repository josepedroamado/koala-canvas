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
        this.props.onChange(this.props.id, event.target.noteText.value);
        event.preventDefault();
    }

    setEditMode = () => {
        this.props.onEdit(this.props.id);
    }

    renderEditing() { 
        return <>
        <Draggable>
            <Card 
                bg='warning'
                style={{ width: '16rem', height: '16rem'}}
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
                            <Button variant="outline-dark" type="submit">
                                Save
                            </Button>
                        </Form>
                </Card.Body>
            </Card>
        </Draggable>
        </>
    }

    renderDisplaying() { 
        return <>
        <Draggable>
            <Card 
                bg='warning'
                style={{ width: '16rem', height: '14rem'}}
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