import react, { Component } from 'react'
import './Joke.css'

class Joke extends Component {
    getColor() {
        if (this.props.votes >= 15) {
            return "#4caf50"
        } else if (this.props.votes >= 12) {
            return "#8bc34a"
        } else if (this.props.votes >= 9) {
            return "#cddc39"
        } else if (this.props.votes >= 6) {
            return "#ffeb3b"
        } else if (this.props.votes >= 3) {
            return "#ffc107"
        } else if (this.props.votes >= 0) {
            return "#ff9800"
        } else {
            return "#f44336"
        }
    }
    getSmiley() {
        if (this.props.votes >= 15) {
            return "rolling_on_the_floor_laughing"
        } else if (this.props.votes >= 12) {
            return "laughing"
        } else if (this.props.votes >= 9) {
            return "smiley"
        } else if (this.props.votes >= 6) {
            return "neutral_face"
        } else if (this.props.votes >= 3) {
            return "confused"
        } else if (this.props.votes >= 0) {
            return "confused"
        } else {
            return "angry"
        }
    }
    constructor(props) {
        super(props);
        this.handleDownVote = this.handleDownVote.bind(this)
        this.handleUpVote = this.handleUpVote.bind(this)
    }
    handleDownVote() {
        this.props.vote(this._reactInternals.key, -1);
    }
    handleUpVote() {
        this.props.vote(this._reactInternals.key, + 1);
    }
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i onClick={this.handleUpVote} className="fas fa-arrow-up"></i>
                    <span className="Joke-votes" style={{ borderColor: this.getColor() }}>{this.props.votes}</span>
                    <i onClick={this.handleDownVote} className="fas fa-arrow-down"></i>
                </div>
                <div className="Joke-text">{this.props.text}</div>
                <i className={`Joke-smiley em em-${this.getSmiley()}`}></i>
            </div>
        )
    }
}

export default Joke;