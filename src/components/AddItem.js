import React from 'react';
import './AddItem.css';

class AddItem extends React.Component {
	state = {
		name: '',
		price: '',
		correct: false,

		errors: {
			priceNull: false,
			nameNull: false,
			priceNotNumber: false,
			priceNegative: false
		}
	};

	message = {
		name_incorrect: 'Pole nazwa nie może być puste',
		price_incorrect_null: 'Pole cena nie może byc puste',
		price_incorrect_notNumber: 'Nieprawidłowy format ceny',
		price_incorrect_negative: 'Cena musi większa od zera'
	};



	handleName = (e) => {
		this.setState({
			name: e.target.value,
		})
	}

	handlePrice = (e) => {
		this.setState({
			price: e.target.value,
		})
	}




	Validate = () => {
		let nameErrorNull = false;
		let priceErrorNaN = false;
		let priceErrorNull = false;
		let priceErrorNegative = false;

		if (this.state.price.length < 1)
			priceErrorNull = true;
		else {
			priceErrorNull = false;
			if (isNaN(this.state.price)) {
				priceErrorNaN = true;
			} else {
				priceErrorNaN = false;

				if (this.state.price * 1 <= 0)
					priceErrorNegative = true;
				else {
					priceErrorNegative = false
				}
			}
		}

		if (this.state.name.length < 1)
			nameErrorNull = true;
		else {
			nameErrorNull = false;
		}

		this.setState({
			errors: {
				priceNull: priceErrorNull,
				nameNull: nameErrorNull,
				priceNotNumber: priceErrorNaN,
				priceNegative: priceErrorNegative
			}
		})

		if (!priceErrorNull && !nameErrorNull && !priceErrorNaN && !priceErrorNegative) {
			this.props.send(this.state.name, this.state.price);

			this.setState({
				name: '',
				price: '',
				correct: false,

				errors: {
					priceNull: false,
					nameNull: false,
					priceNotNumber: false,
					priceNegative: false
				}
			})
		}


	}

	render() {
		return (
			<>
				<h3>Dodaj przedmiot</h3>
				<input type="text" placeholder="nazwa" value={this.state.name} onChange={this.handleName}></input>
				<input type="text" placeholder="koszt" value={this.state.price} onChange={this.handlePrice}></input>
				<button className="addButton" onClick={this.Validate}>Dodaj</button>
				{this.state.errors.nameNull && <span className="error"><br />{this.message.name_incorrect}</span>}
				{this.state.errors.priceNull && <span className="error"><br />{this.message.price_incorrect_null}</span>}
				{this.state.errors.priceNotNumber && <span className="error"><br />{this.message.price_incorrect_notNumber}</span>}
				{this.state.errors.priceNegative && <span className="error"><br />{this.message.price_incorrect_negative}</span>}

			</>
		);
	}
}

export default AddItem;