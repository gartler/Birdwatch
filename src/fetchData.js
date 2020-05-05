import React, { Component } from 'react';

class FetchData extends Component {
  constructor(props) {
   super (props);

   this.stata = {
     data: [{timestamp:55, value:44, id:3}],
   };
  }

  fetchData() {
    let url = "http://192.168.0.111:3004/bird/"

    fetch(url)
     .then(response => response.json())
     .then(data => this.setState({ data }));
  }

  componentDidMount() {
   this.fetchData()
  }

  render (){
   return(
    <div className="fetch">
       {JSON.stringify(this.state.data)}
    </div>
     )
  };
}

export default FetchData;
