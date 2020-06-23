import React from 'react';
import './CardEditor.css';
import './styles.css'
import {Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {front: '', back: '', cards: this.props.cards.slice()};
    }


    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    addCard = () => {
        if (this.state.front.trim() === '' || this.state.back === '') {
            alert('Please fill the front and back of the card');
        }
        else {
            const card = {front: this.state.front, back: this.state.back};
            console.log(card);
            this.props.addCard({front: this.state.front, back: this.state.back});
            this.setState({front: '', back: ''});
            const cards = this.state.cards.slice().concat(card);
            this.setState({cards});
        }
    }

    deleteCard = index => {
        if (this.props.cards.length === 1) {
            alert('You can\'t delete all your cards!');
        }
        else {
            const cards = this.state.cards.slice();
            cards.splice(index, 1);
            this.setState({cards});
            this.props.deleteCard(index);
        }
    }


    editCard = (event, index) => {
        const cards = this.state.cards.slice();
        var edited = cards.splice(index, 1);
        if (event.target.name === "frontedit") {
            edited[0].front = event.target.value;
        }
        else {
            edited[0].back = event.target.value;
        }
        const edit = edited.slice();
        cards.splice(index, 0, edit[0]);
        this.setState({cards});
        this.props.editCard(cards);
    }



    render() {
        var cards = this.state.cards.map((card, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                    <input 
                        name={"frontedit"}
                        onChange={(e) => this.editCard(e, index)} 
                        value={card.front}/>
                    </td>
                    <td>
                    <input 
                        name={"backedit"}
                        onChange={(e) => this.editCard(e, index)} 
                        value={card.back}/>
                    </td>
                    <td>
                        <Button variant="light" onClick={() => this.deleteCard(index)}>Delete</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <h2>Card Editor</h2>
                <br/>
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