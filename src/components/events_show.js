import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { getEvent, deleteEvent, putEvent } from '../actions';

class Eventsshow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.props.getEvent(id);
  }

  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error }
    } = field;
    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
  async onSubmit(values) {
    await this.props.putEvent(values);
    this.props.history.push('/');
  }
  async onDeleteClick() {
    console.log(this.props.match);
    const { id } = this.props.match.params;
    this.props.history.push('/');
    this.props.deleteEvent(id);
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field label="Title" name="title" type="text" component={this.renderField} />
          </div>
          <div>
            <Field label="Body" name="body" type="text" component={this.renderField} />
          </div>
          <div>
            <input type="submit" value="更新" disabled={pristine || submitting || invalid} />
            <Link to="/">キャンセル</Link>
            <Link to="/" onClick={this.onDeleteClick}>
              削除
            </Link>
          </div>
        </form>
        <div>foo</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id];
  return { initialValues: event, event };
};

const mapDispatchToProps = { deleteEvent, getEvent, putEvent };

const validate = values => {
  const errors = {};
  if (!values.title) errors.title = 'タイトルを入力してください';
  if (!values.body) errors.body = 'ボディーを入力してください';
  return errors;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ validate, form: 'eventNewForm', enableReinitialize: true })(Eventsshow));
// export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
