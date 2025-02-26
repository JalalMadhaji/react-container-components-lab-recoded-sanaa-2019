import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews';
// import ReviewList from './ReviewList';

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/all.json?'
            + `api-key=${NYT_API_KEY}`;

// Code LatestMovieReviewsContainer Here
export default class LatestMovieReviewsContainer extends Component{
    constructor(){
        super();
        this.state = {
            reviews:[]
        }
    }

    componentDidMount(){
        fetch(URL).then(res=>res.json()).then(data=>{
            console.log(data);
            this.setState({
                reviews:data.results,
            })
        }).catch(err=>console.log(err));
    }

    render(){
        return(
            <div className="latest-movie-reviews" style={{margin:'40px auto'}}>
            <MovieReviews reviews={this.state.reviews} />
            </div>
        );
    }
}