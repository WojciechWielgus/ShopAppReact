import React from 'react';
import Item from './Item';
import './ItemsList.css';

const ItemsList = props => {
	const items = props.items.map(item => <Item key={item.id} item={item} delete={props.delete} />)
	const itemsArray = props.items.map(item => item.price)
	let sum = 0;
	for (let index = 0; index < itemsArray.length; index++) {
		sum += itemsArray[index] * 1;
	}
	return (
		<div className="currentItems">
			<h2>Aktualne przedmioty</h2>
			{items}
			<br />
			{sum > 0 && <strong><span style={{ fontSize: "25px" }}><div className="nameItem">razem</div> <div className="priceItem">{sum} </div>
				PLN </span></strong>}
		</div >
	);
}

export default ItemsList;