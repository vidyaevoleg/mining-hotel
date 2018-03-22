import React, {Component} from 'react';
import API from '../common/api'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert
} from 'reactstrap'

class RebootingProgress extends Component {

  constructor (props) {
    super(props);
    this.state = {
      ids: props.ids,
      current: 0,
      errors: null
    }
  }

  componentDidMount () {
    this.start();
  }

  start = () => {
    const {current, ids} = this.state;
    const success = () => {
      if (current + 1 < ids.length) {
        this.setState({
          current: current + 1
        })
        this.start();
      } else {
        window.location.reload();
      }
    }
    const error = (res) => {
      this.setState({
        errors: res.errors || {server: ['error']}
      })
    }
    const id = ids[current];
    API.machines.reboot(id, success, error);
  }

  render () {
    const {ids, current, errors} = this.state;
    const {toogle} = this.props;

    const value = current == 0 ? 0 : parseInt(100 * (current + 1) / ids.length);

    return (
      <Modal isOpen={true} size="lg">
        <ModalHeader>
          <h2>
            Ребут
          </h2>
        </ModalHeader>
        <ModalBody>
          {
            errors && <div className="col-12">
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
          }
          <div className="col-12">
            <Alert color="info">
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={value}
                aria-valuemin="0" aria-valuemax="100" style={{width: value + '%'}}>
                  {value}%
                </div>
              </div>
            </Alert>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toogle}>Отмена</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
export default RebootingProgress;
