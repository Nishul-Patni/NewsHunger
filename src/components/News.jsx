import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
    
    static defaultProps = {
        country : 'in',
        pageSize : 9,
        category : "general"
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }

    constructor(){
        super();
        this.state = {
            articles: [],
            page : 1,
            loading:true,
            hasMore:true
        }
        this.handleNext = this.handleNext.bind(this);
        this.getNews = this.getNews.bind(this);
    }

    
    async componentDidMount() {
        await this.getNews(1);
    }
    
    
    async getNews(page){
        this.setState({
            loading:true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=823cded20690407da0522624abf27aaa&page=${page}&pageSize=${this.props.pageSize}&category=${this.props.category}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            loading:false
        })
        this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults:parsedData.totalResults, page:page, pageSize:this.props.pageSize, hasMore:true});
    }


    handlePrevious = async ()=>{
        if(this.state.page!==1){
            let nextPage = this.state.page-1;
            let totalPage = Math.ceil(this.state.totalResults/this.state.pageSize);
            if(nextPage<=totalPage){
                await this.getNews(nextPage);
            }
        }
        
    }

    async handleNext(){
        let nextPage = this.state.page+1;
        let totalPage = Math.ceil(this.state.totalResults/this.state.pageSize);
        if(nextPage<=totalPage){
            await this.getNews(nextPage);
        }else{
            this.setState({hasMore:false})
        }
    }

    async fetchMoreData(){
        
    }

    render() {
        return (
            
            <>
                {/* <h2 className='text-center'>News Hunger Headlines</h2>
                {(this.state.loading && <Spinner/>)
                    
                    || 
                    
                    <div className="row">
                        {this.state.articles.map((data)=>{
                            return <div className="col-md-4" key={data.url}>
                                <NewsItem data = {data}/>
                            </div>
                        })}
                    </div>
                }
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page===1? true: false} type="button" className="btn btn-primary mx-3" onClick={this.handlePrevious}>&larr; Previous</button>
                    <button disabled={this.state.page===Math.ceil(this.state.totalResults/this.state.pageSize)?true:false} type="button" className="btn btn-primary mx-3" onClick={this.handleNext}>Next Page &rarr;</button>
                </div> */}

                <InfiniteScroll dataLength={this.state.articles.length} next={this.handleNext} hasMore={this.state.hasMore} loader={<Spinner/>}>
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((data)=>{
                                return <div className="col-md-4" key={data.url}>
                                    <NewsItem data = {data}/>
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
