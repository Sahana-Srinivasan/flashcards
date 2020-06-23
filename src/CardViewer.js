import React from 'react';
import './styles.css'
import {Button} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import './CardViewer.css'

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            front: true,
        }
        this.arrowFunction = this.arrowFunction.bind(this);
    }

    nextCard = () => {
        if (this.state.current < this.props.cards.length - 1) {
            this.setState({current: this.state.current + 1, front: true});
        }
    }

    prevCard = () => {
        if (this.state.current > 0) {
            this.setState({current: this.state.current - 1, front: true});
        }
    }

    randomCard = () => {
        const index = Math.floor(Math.random() * this.props.cards.length);
        this.setState({current: index, front: true});
    }

    flip = () => {
        this.setState({front: !this.state.front});
    }

    arrowFunction = event => {
        if (event.keyCode === 39) {
            this.nextCard();
        } else if (event.keyCode === 37) {
            this.prevCard();
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.arrowFunction, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.arrowFunction, false);
    }

    render() {

        var cards = this.props.cards.slice()
        var currCard = cards.splice(this.state.current, 1)[0]
        const current = this.state.current;
        var first = (current === 0);
        var last = (current === this.props.cards.length - 1);
        // let next; 
        // if (current < this.props.cards.length - 1) {
        //     next = <Button variant="secondary" id="change-card" onClick={this.nextCard}>Next</Button>
        // }
        // let prev; 
        // if (current !== 0) {
        //     prev = <Button variant="secondary" id="change-card" onClick={this.prevCard}>Prev</Button>
        // }
        return (
            <div>
                <h2>Card Viewer</h2>
                <br/>
                <Card id="flashcard" onClick={this.flip}>
                    <Card.Body>
                        <Card.Text>
                            {this.state.front ? currCard.front : currCard.back}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br/>
                Flashcard {current + 1} of {this.props.cards.length}
                <br/>
                <Button variant="secondary" id="change-card" onClick={this.prevCard} disabled={first}>Prev</Button>
                <Button variant="secondary" id="change-card" onClick={this.nextCard} disabled={last}>Next</Button>
                <Button variant="secondary" id="change-card" onClick={this.randomCard}>Random</Button>
                <br/>
                <br/>
                <Button variant="info" size="sm" onClick={this.props.switchMode}>Go to Card Editor</Button>
            </div>
        );
    }
}

export default CardViewer;