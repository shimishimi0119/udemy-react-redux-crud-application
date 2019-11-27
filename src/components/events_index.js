import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { readEvents } from '../actions';

class EventsIndex extends Component {
  componentDidMount() {
    this.props.readEvents();
  }
  renderEvents() {
    return _.map(this.props.events, event => (
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>{event.title}</td>
        <td>{event.body}</td>
      </tr>
    ));
  }

  render() {
    const props = this.props;

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>{this.renderEvents()}</tbody>
        </table>
        <div>{console.log(props.events)}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ events: state.events });

const mapDispatchToProps = { readEvents };

// const mapDispatchToProps = dispatch => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement())
// });

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
