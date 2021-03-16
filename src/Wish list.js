import React from 'react';
import './Style.css';
import searchIcon from './searchIcon.png';
import { Search } from './ServerCall.js'

class WishList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        result: null,
        searchRun: "false"
    }
  }
  results = () => {
    let data = Search();
    this.setState({
        result: data,
        searchRun: "true"
      })
    }
   
  render() {
    return (
      <div className="main">  
        <div className="main-header">
          <div>
            <h2>WISH LIST</h2>
            <p>Search for books you want to get</p>
          </div>
        </div>      
        <div className="main-content">
          <div className="search-field">
          <input id="search-input" type="text" placeholder="Search" autoComplete="off" ></input>
          <img src={searchIcon} onClick={this.results.bind(this)}></img>
          </div>
          <SearchResults searchResult={this.state.result} searchRun={this.state.searchRun} />
        </div>      
      </div>
    );
  }
};

export default WishList;

const SearchResults = (props) => {
  // render if result is not null; some data sent to Search function
  if (props.searchRun === "true") {
    if (props.searchResult.length === 0) {
      return (
        <p>We did not find that book in our collection. Try something else.</p>
      )
    } else {
          return (
            <div className="search-bookResults">
                <p>We found these books:</p>
                {props.searchResult.map(element => (
                <div className="flex-row">
                    <img id={element.id} className="book-cover" src={process.env.PUBLIC_URL + element.imageUrl}></img>
                    <div className="flex-column">
                        <h2>"{element.name}"</h2>
                        <p>{element.author}</p>
                    </div>
                </div>
                ))} 
            </div>
          )
        } 
  } else {
  return "";
  }
}
  
      