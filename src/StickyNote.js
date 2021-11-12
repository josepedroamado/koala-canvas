import Draggable from 'react-draggable';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import React from 'react';

export default class StickyNote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editing: false,
            content: props.content
        }
    }

    componentDidMount() {
        
    }

    remove = () => {
        this.props.onRemove();
    }

    render() { 
        return <>
        <Draggable>
            <Card 
                bg='warning'
                style={{ width: '16rem', height: '14rem'}}
                className="mb-2 shadow">
                <Card.Body>
                    <CloseButton className="float-right" onClick={this.remove}/>
                    <Card.Text>
                        {this.state.content}
                    </Card.Text>               
                </Card.Body>
            </Card>
        </Draggable>
        </>
    }
}