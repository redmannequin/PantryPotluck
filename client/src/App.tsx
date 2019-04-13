import React, { Component, StatelessComponent } from 'react';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ReactTags, { Tag } from "react-tag-autocomplete";

interface IRecipe {
    title: string;
    key?: string;
    directions: string[];
    ingredients: string[];
    tags?: IRecipeTag[];
    categories: string[];
    calories: number;
    protein: number;
    fat: number;
    sodium: number;
    rating: number;
    date: Date;
  }

interface IRecipeTag {
  name: string;
}


interface IState {
	tags: Tag[],
	suggestions: Tag[],
	recipes: IRecipe[]
}

type State = IState;

class App extends Component<any, State> {
	constructor (props: any) {
		super(props)
		this.state = {
			tags: [],
			suggestions: [],
			recipes: [
				{
					title: 'Test',
					key: 'Test',
					directions: ['Test','Test'],
					ingredients: ['Test', 'Test'],
					tags: [
						{ name: 'Test'}, 
						{ name: 'Test'}
					],
					categories: ['Test', 'Test'],
					calories: 100,
					protein: 100,
					fat: 100,
					sodium: 100,
					rating: 100,
					date: new Date(),
				},{
					title: 'Test',
					key: 'Test',
					directions: ['Test','Test'],
					ingredients: ['Test', 'Test'],
					tags: [
						{ name: 'Test'}, 
						{ name: 'Test'}
					],
					categories: ['Test', 'Test'],
					calories: 100,
					protein: 100,
					fat: 100,
					sodium: 100,
					rating: 100,
					date: new Date(),
				},{
					title: 'Test',
					key: 'Test',
					directions: ['Test','Test'],
					ingredients: ['Test', 'Test'],
					tags: [
						{ name: 'Test'}, 
						{ name: 'Test'}
					],
					categories: ['Test', 'Test'],
					calories: 100,
					protein: 100,
					fat: 100,
					sodium: 100,
					rating: 100,
					date: new Date(),
				}
			]
		}
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
	}

	componentDidMount() {
		const state = { ...this.state };
		axios
			.get('http://localhost:5000/tags')
			.then( res => {
				const suggestions: Tag[] = res.data.map( (elm: string, idx: number) => {return {id: idx, name: elm}} );
				state.tags = [];
				state.suggestions = suggestions;
				this.setState(state)
			})
			.catch()
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
							recipes.map( (recipe: IRecipe, idx:number) => <RecipeCard data={recipe} key={idx}/>)
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

const RecipeCard:StatelessComponent<any> = (props: any) => {
	const {
		title,
		directions,
		ingredients,
		rating
	} = props.data;

	return(
		<div className="col-6" style={{paddingBottom:'10px'}}>
			<div className="card">
				
				<h5 className="card-header">{title}({[rating]})</h5>

				<div className="card-body">

					<div className="row">

						<div className="col-4">
							<p className="card-text">
								Ingredients: <br/> &nbsp;&nbsp;&nbsp;&nbsp;
								{
									ingredients.join(', ')
								}
							</p>
						</div>
					
						<div className="col-8">
							Directions: <br/>
								<ol>
									{
										directions.map( (elm:string, idx:number) => <li key={idx}>{elm}</li>)
									}
								</ol>
							
						</div>
					

					</div>
					
				</div>
			</div>
		</div>
	)
}

export default App;
