import { Component } from "react";

export class D extends Component<{}, { date: Object }> {
  constructor(props: any) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  tickClock() {
    this.setState({
      date: new Date(),
    });
  }

  componentDidMount() {
    setInterval(() => this.tickClock(), 1000);
  }

  render() {
    return (
      <>
        <h2>
          {this.state.date.toLocaleString()}(the time was rendered with a class
          component)
        </h2>
        <p>Refresh page if time is not in sync.</p>
      </>
    );
  }
}
