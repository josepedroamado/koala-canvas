import React from 'react';
import Draggable from 'react-draggable'
import Image from 'react-bootstrap/Image'

export default class Picture extends React.Component {

    savePosition = (x, y) => {
        this.props.onStop(this.props.id, x, y)
    }

    remove = () => {
        this.props.onRemove(this.props.id)
    }

    render() { 
        return <>
            <Draggable  position={{x: this.props.position.x, y: this.props.position.y}}
                        
                        onStop={(e, data) => {this.savePosition(data.x, data.y)}}>                         
                    <Image  src={this.props.picture} 
                            key={this.props.id} 
                            style={{
                                width: '300px', 
                                height: '300px',
                                position: 'absolute'   
                            }}                       
                            rounded
                            className="mb-2 shadow"
                            draggable="false"
                            onDoubleClick={this.remove}/>        

            </Draggable>
        </>
    }
}