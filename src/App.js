import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {front: 'front1', back: 'back1'},
        {front: 'front2', back: 'back2'},
        {front: 'front3', back: 'back3'},
        {front: 'front4', back: 'back4'},
      ],
      editor: true,
    }
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({cards});
  }

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({cards});
  }

  switchMode = () => {
    this.setState({editor: !this.state.editor});
  }

  editCard = cards => {
    this.setState({cards});
  }

  render () {

      if (this.state.editor) {
        return (
          <div id="Page" align="center">
            <CardEditor 
              addCard={this.addCard} 
              deleteCard={this.deleteCard} 
              cards={this.state.cards}
              switchMode = {this.switchMode}
              editCard = {this.editCard}
            />
          </div>
        );
      }
      else {
        return (
        <div id="Page" align="center">
           <CardViewer cards={this.state.cards}switchMode = {this.switchMode}/>
        </div>);
      }
  }
}

export default App;
