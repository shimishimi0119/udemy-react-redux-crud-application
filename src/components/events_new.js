import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { postEvent } from '../actions';

class EventsNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
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
    await this.props.postEvent(values);
    this.props.history.push('/');
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
            <RaisedButton label="登録" type="submit" style={style} disabled={pristine || submitting || invalid} />
            <RaisedButton label="キャンセル" type="button" style={style} containerElement={<Link to="/" />} />
          </div>
        </form>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({ events: state.events });

const mapDispatchToProps = { postEvent };

const validate = values => {
  const errors = {};
  if (!values.title) errors.title = 'タイトルを入力してください';
  if (!values.body) errors.body = 'ボディーを入力してください';
  return errors;
};

export default connect(null, mapDispatchToProps)(reduxForm({ validate, form: 'eventNewForm' })(EventsNew));
// export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
