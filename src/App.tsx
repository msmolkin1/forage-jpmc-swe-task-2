import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  intervalId: NodeJS.Timeout | null;
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
    };
    this.intervalId = null;
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    return (<Graph data={this.state.data}/>)
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
      // Update the state by creating a new array of data that consists of
      // Previous data in the state and the new data from server
      console.log(serverResponds); // TODO: Nothing's logging for some reason and it's not streaming data
      this.setState({ data: [...this.state.data, ...serverResponds] });
    });
  }

  /**
   * Start streaming data from server
   */
  startStreamingData() {
    // Get data from server
    console.log(new Date().toISOString() + ': Starting to stream data...')
    console.log(this.intervalId)
    if (this.intervalId == null) {
      this.intervalId = setInterval(() => {
        this.getDataFromServer();
      }, 100);
    }
  }

  /*
  * We should clear the interval in `componentWillUnmount`: to ensure that no more calls to the interval callback are made once the component has been removed from the UI. If you set an interval inside a component and the component gets unmounted, the interval callback may still run because it was scheduled by the JavaScript engine, not by React itself. If the callback tries to update the state of the unmounted component, you will get an error because you cannot update the state of a component that's not in the DOM
  */
  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.startStreamingData()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
