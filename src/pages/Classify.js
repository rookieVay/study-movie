import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Flex } from 'antd-mobile';

class Classify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            floorTitle: '',
            floorData: []
        }
    }

    render() {
        return (
            <Fragment>
                <div className="classify-title">{this.state.floorTitle}</div>
                <Flex wrap="wrap" className="classify">
                    {this.state.floorData.map((item, index) => (
                        <Flex.Item className="item" key={index}>
                            <a
                                href={'/details/' + this.props.match.params.classifyId + '/' + item.id}
                            >
                                <img src={item.img} alt="" style={{width: '100%', height: '120px'}} />
                                <div className="txt">{item.title}</div>
                            </a>
                        </Flex.Item>
                    ))}
                </Flex>
            </Fragment>
        )
    }

    componentDidMount() {
        axios.get('/debug/list')
        .then((res) => {
            let arr = res.data.movie.filter(item => item.id === Number(this.props.match.params.classifyId));
            this.setState({
                floorTitle: arr[0].floorTitle,
                floorData: arr[0].lists
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export default Classify;