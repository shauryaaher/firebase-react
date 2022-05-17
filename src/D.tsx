import { Component } from "react";

export class D extends Component<{}, { date: Object }> {
  constructor(props: any) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  tickClock(): number {
    this.setState({
      date: new Date(),
    });
    return 10;
  }

  componentDidMount() {
    setInterval(() => this.tickClock(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.tickClock());
  }
  render() {
    return (
      <>
        <h2>
          {this.state.date.toLocaleString()}
        </h2>
        <p>Refresh page if time is not in sync.</p>
      </>
    );
  }
}
