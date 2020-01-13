import React from 'react';
import './App.css';
import AddItem from './AddItem';
import ItemsList from './ItemsList';

const API = 'http://localhost:3001/items';

class App extends React.Component {
  state = {
    items: [],
    connectWithServer: false,
  }

  handleDataFetch = () => {
    fetch(API)
      .then(response => {
        if (response.ok) {
          this.setState({ connectWithServer: true });
          return response;
        }
        this.setState({ connectWithServer: false })
        throw Error(response.status)
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data,
        })
      })
      .catch(error => console.log(error + " błąd pobierania danych"))
  }

  sendData = (name, price) => {
    fetch(API, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          "name": name,
          "price": price
        }
      )
    }).then(() => this.handleDataFetch())
  }

  deleteData(item, url) {
    return fetch(url + '/' + item, {
      method: 'delete'
    })
      .then(response => response.json())
      .then(() => this.handleDataFetch());
  }

  handleDeleteItem = (id) => {
    this.deleteData(id, API);
  }

  componentDidMount() {
    this.handleDataFetch();
  }

  render() {
    return (
      <div className="App">
        <h1>Koszyk Wojciech Wielgus</h1>
        <span>{!this.state.connectWithServer ? <span className="incorrectServerConnection">Brak połączenia z serwerem</span> :
          <div>
            <AddItem send={this.sendData} />
            <br /><br /><hr />

            <ItemsList items={this.state.items} delete={this.handleDeleteItem} />
            {this.state.items.length < 1 && <span>Brak przedmiotów w koszyku</span>}
          </div>
        }</span>
      </div >
    )
  }
}

export default App;
