import React, {Component} from 'react'
import Errors from './errors';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert
} from 'reactstrap'
import API from '../common/api'

class MachinePopup extends Component {

  constructor (props) {
    super(props);
    this.state = {
      machine: props.machine,
      models: gon.models
    };
  }

  changeFieldHandler = (e) => {
    const {name, value} = e.target;
    this.setState({
      machine: {
        ...this.state.machine,
        [name]: value,
      },
      errors: null
    })
  }

  submit = () => {
    const {machine} = this.state;

    const success = (res) => {
      window.location.reload();
    }

    const err = (res) => {
      this.setState({
        errors: res.errors || {server: ['error']}
      })
    }
    if (machine.id) {
      API.machines.update(machine, success, err);
    } else {
      API.machines.create(machine, success, err);
    }
  }

  header = () => {
    const {machine} = this.state;
    let header;
    if (machine && machine.id) {
      header = 'Тачка # ' + machine.id;
    } else {
      header = 'Новая тачка';
    }
    return header;
  }

  render () {
    const {toogle} = this.props;
    const {models, machine, errors} = this.state;
    const header = this.header();

    return (
      <Modal isOpen={true} toogle={toogle} size="lg">
        <ModalHeader>
          <h2>
            {header}
          </h2>
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <Errors errors={errors} />
            <div className="col-sm-6">
              <label>Модель</label>
              <select className="form-control" name="model" value={machine.model} onChange={this.changeFieldHandler}>
                {models.map(m => <option value={m}>{m}</option>)}
              </select>
            </div>
            <div className="col-sm-6">
              <label>IP</label>
              <input placeholder="тут будет внутренний айпи" name="ip" className="form-control" value={machine.ip} onChange={this.changeFieldHandler} />
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-sm-6">
              <label>Место</label>
              <input placeholder="1-2-2" name="place" className="form-control" value={machine.place} onChange={this.changeFieldHandler}/>
            </div>
            <div className="col-sm-6">
              <label>Серийный номер</label>
              <input placeholder="" name="serial" className="form-control" value={machine.serial} onChange={this.changeFieldHandler}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <label>Id пользователя в общей системе</label>
              <input placeholder="1" name="user_id" className="form-control" value={machine.user_id} onChange={this.changeFieldHandler}/>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.submit}>Сохранить</Button>
          <Button color="secondary" onClick={toogle}>Отмена</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default MachinePopup;
