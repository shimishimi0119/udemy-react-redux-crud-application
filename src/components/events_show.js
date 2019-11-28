import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
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
    const style = {
      margin: 12
    };

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
            <RaisedButton label="更新" type="submit" style={style} disabled={pristine || submitting || invalid} />
            <RaisedButton label="キャンセル" type="button" style={style} containerElement={<Link to="/" />} />
            <RaisedButton
              label="削除"
              type="button"
              style={style}
              onClick={this.onDeleteClick}
              containerElement={<Link to="/" />}
            />
          </div>
        </form>
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
