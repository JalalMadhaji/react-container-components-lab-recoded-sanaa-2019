import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews';
import SearchFrom from './searchForm';

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here
export default class SearchableMovieReviewsContainer extends Component{
    constructor(){
        super();
        this.state = {
            reviews:[],
            searchTerm:''
        }
    }
    handleFetch = () =>{
        fetch(URL).then(res=>res.json()).then(data=>{
            let result = data.results.filter(filtered=>{
                return filtered.display_title.includes(this.state.searchTerm)
            })
            this.setState({
                reviews:result
            })
        }).catch(err=>console.log(err));
    }
    handleInputChange = event =>{
        this.setState({
            searchTerm:event.target.value
        })
    }
    handleFromSubmit = event =>{
        event.preventDefault();
        this.handleFetch()
    }
    render(){
        return(
            <div className='review-list' style={{margin:'4px auto'}}>
            <SearchFrom handleSearch={this.handleFromSubmit} handleChange={this.handleInputChange} value={this.state.searchTerm} />
            <MovieReviews reviews={this.state.reviews} />
            </div>
        );
    }
}