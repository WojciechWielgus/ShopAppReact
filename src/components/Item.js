import React from 'react';
import './Item.css';

class Item extends React.Component {
	state = {
		confirm: false,
	}

	handleRemoveClick = () => {
		this.setState({
			confirm: true,
		})
	}

	handleDontRemove = () => {
		this.setState({
			confirm: false,
		})
	}
	render() {
		const { name, price, id } = this.props.item
		return (
			<div className="item">
				<span className="nameItem"><strong>{name}</strong></span> : <span className="priceItem">{price} </span>
				<button onClick={this.handleRemoveClick}>X</button>
				<span>{this.state.confirm && <div className="confirmDiv">
					Czy napewno chcesz usunąć przedmiot <strong>{name}</strong> ?
					<button onClick={() => this.props.delete(id)}>TAK</button>
					<button onClick={this.handleDontRemove}>NIE</button>
				</div>}</span>
				<div className="separatorDiv"></div>
			</div>
		);
	}
}

export default Item;
