import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ReactTags from "react-tag-autocomplete";

interface IState {
	tags: any[],
	suggestions: any[],
	recipes: any[]
}

type State = IState;

class App extends Component<any, State> {
	constructor (props: any) {
		super(props)
		this.state = {
			tags: [
				{ id: 1, name: "Apples" },
				{ id: 2, name: "Pears" }
			],
			suggestions: [
				{ id: 3, name: "Bananas" },
				{ id: 4, name: "Mangos" },
				{ id: 5, name: "Lemons" },
				{ id: 6, name: "Apricots" }
			],
			recipes: [
				{
					title: 'Test',
					key: 'Test',
					directions: ['Test','Test'],
					ingredients: ['Test', 'Test'],
					tags: ['Test', 'Test'],
					categories: ['Test', 'Test'],
					calories: 100,
					protein: 100,
					fat: 100,
					sodium: 100,
					rating: 100,
					date: Date.now(),
				},{
					title: 'Test',
					key: 'Test',
					directions: ['Test','Test'],
					ingredients: ['Test', 'Test'],
					tags: ['Test', 'Test'],
					categories: ['Test', 'Test'],
					calories: 100,
					protein: 100,
					fat: 100,
					sodium: 100,
					rating: 100,
					date: Date.now(),
				},{
					title: 'Test',
					key: 'Test',
					directions: ['Test','Test'],
					ingredients: ['Test', 'Test'],
					tags: ['Test', 'Test'],
					categories: ['Test', 'Test'],
					calories: 100,
					protein: 100,
					fat: 100,
					sodium: 100,
					rating: 100,
					date: Date.now(),
				}
			]
		}

		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
	}


	render() {
		const {tags, suggestions, recipes} = this.state;

		return (
			<div className="App">

				<div className="">
					<nav className="navbar navbar-dark bg-dark">
						<div className="container">
							<a className="navbar-brand text-white">PantryPotluck</a>
						</div>	
					</nav>
				</div>

				<br/>

				<div className="container">

					<ReactTags
						tags={tags}
						suggestions={suggestions}
						handleDelete={this.handleDelete}
						handleAddition={this.handleAddition} 
					/>

					<br/>

					<div className='row'>
						{
							recipes.map( recipe => getRecipeCard(recipe))
						}
					</div>

				</div>


				<footer className="bg-dark text-white mt-5 p-4 text-center"/>


			</div>
		);
	}

	private handleDelete(i:number) {
		const state = { ...this.state };
		const tags = state.tags.slice(0);
		tags.splice(i, 1);
		this.setState({ tags });
	}

	private handleAddition(tag: { id: string | number; name: string }) {
		const state = { ...this.state };
		const tags = state.tags.concat(tag);
    	this.setState({ tags });
	}
}

const getRecipeCard = (props: any) => {

	return(
		<div className="col-6" style={{paddingBottom:'10px'}}>
			<div className="card">
				<h5 className="card-header">Featured</h5>
				<div className="card-body">
					<h5 className="card-title">Special title treatment</h5>
					<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
				</div>
			</div>
		</div>
	)
}

export default App;
