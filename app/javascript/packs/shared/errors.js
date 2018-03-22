import React, {Component} from 'react';

import {
  Alert
} from 'reactstrap'

export default class Errors extends Component {

  render () {
    const {errors} = this.props;
    if (!errors) return <div></div>;
    return (
      <div className="col-12">
        <Alert color="danger">
          <ul>
            {Object.keys(errors).map((k) => {
              return (
                <li> {k} {errors[k].toLocaleString()} </li>
              )
            })}
          </ul>
        </Alert>
      </div>
    )
  }
}
