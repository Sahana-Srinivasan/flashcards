import React from 'react';
import './CardEditor.css';
import './styles.css'
import {Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {front: '', back: ''}
    }


    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    addCard = () => {
        if (this.state.front.trim() === '' || this.state.back === '') {
            alert('Please fill the front and back of the card');
        }
        else {
            this.props.addCard(this.state);
            this.setState({front: '', back: ''});
        }
    }

    deleteCard = index => {
        if (this.props.cards.length === 1) {
            alert('You can\'t delete all your cards!')
        }
        else {
            this.props.deleteCard(index);
        }
    }

    render() {
        const cards = this.props.cards.map((card, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <Button variant="light" onClick={() => this.deleteCard(index)}>Delete</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <h2>Card Editor</h2>
                <Table id ="card-table" striped bordered hover size="sm" responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{cards}</tbody>
                </Table>
                <br/>
                <input 
                    name="front"
                    onChange={this.handleChange} 
                    placeholder="Front of card" 
                    value={this.state.front}/>
                <input 
                    name="back"
                    onChange={this.handleChange} 
                    placeholder="Back of card" 
                    value={this.state.back}/>
                <Button variant="info" size="sm" onClick={this.addCard}>Add card</Button>
                <br/>
                <br/>
                <Button variant="info" size="sm" onClick={this.props.switchMode}>Go to Card Viewer</Button>
            </div>
        );
    }
}

export default CardEditor