import react, { Component } from 'react';
import './JokeList.css';
import axios from 'axios';
import Joke from './Joke.js';
import { v4 as uuidv4 } from 'uuid';

const url = 'https://icanhazdadjoke.com/';

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);
        this.state = {
            //jokes: []
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            loading: false
        }
        this.handleJokeVote = this.handleJokeVote.bind(this);
        this.handleGetNewJokes = this.handleGetNewJokes.bind(this);
    }
    componentDidMount() {
        if (this.state.jokes.length === 0) {
            this.getJokes()
        }
    }
    handleGetNewJokes() {
        this.setState({loading: true}, this.getJokes)
        //this.getJokes()
        
    }
    async getJokes() {
        try {
            // while (this.state.jokes.length < this.props.numJokesToGet) {
            //     let newJoke = true;
            //     let joke = '';
            //     do {
            //         let jokeREs = await axios.get(url, { headers: { Accept: "application/json" } });
            //         joke = jokeREs.data.joke;
            //         this.state.jokes.map(j => { if (j === joke) { newJoke = false } })
            //     } while (!newJoke)
            //     let newJokes = [...this.state.jokes,
            //     {
            //         text: joke,
            //         id: uuidv4(),
            //         votes: 0
            //     }];
            // this.setState(st => ({ jokes: newJokes }),
            //     () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
            // }

            //
            let jokes = [];
            while (jokes.length < this.props.numJokesToGet) {
                let newJoke = true;
                let joke = '';
                do {
                    let jokeREs = await axios.get(url, { headers: { Accept: "application/json" } });
                    joke = jokeREs.data.joke;
                    this.state.jokes.map(j => { if (j === joke) { newJoke = false } })
                    jokes.map(j => { if (j === joke) { newJoke = false } })
                } while (!newJoke)
                jokes.push({
                    text: joke,
                    id: uuidv4(),
                    votes: 0
                })
            }
            let newJokes = [...this.state.jokes,...jokes];
            this.setState(st => ({ jokes: newJokes, loading: false }),
                    () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
            //

            //console.log(this.state.jokes)
        } catch (err) {
            console.log('Failed To Get A New Joke :(')
            alert('Failed To Get A New Joke :(')
        }
    }
    handleJokeVote(key, delta) {
        let newJokes = this.state.jokes.map(j => {
            if (j.id == key) return { ...j, votes: j.votes + delta }
            else return j
        });
        this.setState(st => ({ jokes: newJokes }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
    }
    render() {
        if(this.state.loading){
            return(
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1 className="JokeList-title">
                        Loading...
                    </h1>
                </div>
            )
        }
        let sortedJokes = this.state.jokes.sort((a, b) => b.votes - a.votes)
        let jokes = sortedJokes.map(j =>
            <Joke
                text={j.text}
                key={j.id}
                votes={j.votes}
                vote={this.handleJokeVote}
            />)
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
                    <button onClick={this.handleGetNewJokes} className="JokeList-getmore">More Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {jokes}
                </div>
            </div>
        )
    }
}

export default JokeList;