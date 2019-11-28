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
    await this.props.postEvent(values);
    this.props.history.push('/');
  }
  async onDeleteClick() {
    console.log(this.props.match);
    const { id } = this.props.match.params;
    this.props.history.push('/');
    this.props.deleteEvent(id);
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
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
            <input type="submit" value="Submit" disabled={pristine || submitting} />
            <Link to="/">キャンセル</Link>
            <Link to="/" onClick={this.onDeleteClick}>
              DELETE
            </Link>
          </div>
        </form>
        <div>foo</div>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({ events: state.events });

const mapDispatchToProps = { deleteEvent };

const validate = values => {
  const errors = {};
  if (!values.title) errors.title = 'タイトルを入力してください';
  if (!values.body) errors.body = 'ボディーを入力してください';
  return errors;
};

export default connect(null, mapDispatchToProps)(reduxForm({ validate, form: 'eventNewForm' })(Eventsshow));
// export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
