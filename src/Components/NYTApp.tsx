import React, { Component } from "react";
import NYTResults from "./NYTResults";

const baseURL: string =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const key: string = "mG4tRbcpSvy3vlCz2cag9QZqWy8y5I8V";

type StateVariables = {
  search: string;
  startDate: string;
  endDate: string;
  pageNumber: number;
  results: any;
};

class NYTApp extends Component<{}, StateVariables> {
  constructor(props: StateVariables) {
    super(props);
    this.state = {
      search: "",
      startDate: "",
      endDate: "",
      pageNumber: 0,
      results: [],
    };
  }

  fetchResults() {
    let url: string = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.search}`;
    url = this.state.startDate
      ? url + `&begin_date=${this.state.startDate}`
      : url;
    url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;
    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ results: data.response.docs });
        console.log(this.state.results);
      })
      .catch((err) => console.log(err));
  }

  handleSubmit(event: any) {
    this.setState({ pageNumber: 0 });
    event.preventDefault();
    this.fetchResults();
  }

  changePageNumber(event: any, direction: string) {
    event.preventDefault();
    if (direction === "down") {
      if (this.state.pageNumber > 0) {
        this.setState({ pageNumber: this.state.pageNumber - 1 });
        this.fetchResults();
      }
    }
    if (direction === "up") {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
      this.fetchResults();
    }
  }

  render() {
    return (
      <div className="main">
        <div className="mainDiv">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <span>Enter a single search term (required) : </span>
            <input
              type="text"
              name="search"
              onChange={(e) => this.setState({ search: e.target.value })}
              required
            />
            <br />
            <span>Enter a start date: </span>
            <input
              type="date"
              name="startDate"
              pattern="[0-9]{8}"
              onChange={(e) => this.setState({ startDate: e.target.value })}
            />
            <br />
            <span>Enter an end date: </span>
            <input
              type="date"
              name="endDate"
              pattern="[0-9]{8}"
              onChange={(e) => this.setState({ endDate: e.target.value })}
            />
            <br />
            <button className="submit">Submit search</button>
          </form>
          {this.state.results.length > 0 ? (
            <NYTResults
              results={this.state.results}
              changePage={this.changePageNumber}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default NYTApp;
