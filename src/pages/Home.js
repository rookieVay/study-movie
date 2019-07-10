import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Carousel, WingBlank, Card, WhiteSpace } from 'antd-mobile';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgHeight: 170,
            banner: [],
            movie: [],
            lists: []
        }
    }

    render() {
        return (
            <Fragment>
                {/* 轮播图 */}
                <WingBlank className="banner">
                    <Carousel
                        autoplay={false}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                        {
                            this.state.banner.map((val, index) => (
                                <a
                                    key={index}
                                    href="##"
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={`${process.env.PUBLIC_URL}${val}`}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a>
                            ))
                        }
                    </Carousel>
                </WingBlank>

                {/* 分类楼层 */}
                {this.state.movie.map((item, index) => (
                    <Fragment key={index}>
                        <WhiteSpace size="lg" />
                        <Card full>
                            <Card.Header
                                title={item.floorTitle}
                                extra={<a href={'/classify/' + item.id}>more</a>}
                            />
                            <Card.Body style={{padding:'10px 0 4px', overflow: 'hidden'}}>
                                <WingBlank >
                                    <Carousel className="space-carousel"
                                        frameOverflow="visible"
                                        cellSpacing={10}
                                        slideWidth={0.4}
                                        dots={false}
                                        // autoplay
                                        infinite
                                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                    >
                                        {
                                            item.lists.filter((filterItem, filterIndex) => filterIndex < 6).map((listItem, listIndex) => (
                                                <a
                                                    key={listIndex}
                                                    href={'/details/' + item.id + '/' + listItem.id}
                                                    style={{
                                                        display: 'block',
                                                        position: 'relative',
                                                        boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                                    }}
                                                >
                                                    <img
                                                        src={`${process.env.PUBLIC_URL}${listItem.img}`}
                                                        alt=""
                                                        style={{ width: '100%', height: '160px', verticalAlign: 'top' }}
                                                        onLoad={() => {
                                                            window.dispatchEvent(new Event('resize'));
                                                        }}
                                                    />
                                                </a>
                                            ))
                                        }
                                    </Carousel>
                                </WingBlank>
                            </Card.Body>
                        </Card>
                    </Fragment>
                ))}
            </Fragment>
        );
    }

    componentDidMount() {
        axios.get('/debug/list')
        .then((res) => {
            this.setState({
                banner: res.data.banner,
                movie: res.data.movie
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export default Home;
