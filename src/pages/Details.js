import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {}
        }
    }
    
    render() {
        return (
            <Fragment>
                <div className="details-title">{this.state.details.title}</div>
                <img className="details-img" src={this.state.details.img} alt="" />
                <p className="details-desc">{this.state.details.intro}</p>
            </Fragment>
        )
    }

    componentDidMount() {
        axios.get('/debug/list')
        .then((res) => {
            let classify = res.data.movie.filter(item => item.id === Number(this.props.match.params.classifyId))[0];
            let details = classify.lists.filter(item => item.id === Number(this.props.match.params.detailsId))[0];
            this.setState({
                details: details
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export default Details;