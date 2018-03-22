import React, {Component} from 'react'
import dums from '../common/dums'
import API from '../common/api'
import SavingProgress from './saving_progress'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Button
} from 'reactstrap'

class MachineConfigPopup extends Component {

  constructor (props) {
    super(props);
    const {machine, machines, templates} = props;
    const template = (machine && templates.find(t => t.id == machine.template_id)) || dums.templateDum;

    this.state = {
      ids: machine ? [machine.id] : machines.map(m => m.id),
      template: template,
      templateId: null,
      progress: false,
      errors: null
    }
  }

  onChangeFieldHandler = (e) => {
    const {name, value} = e.target;
    this.setState({
      template: {
        ...this.state.template,
        [name]: value
      },
      errors: null
    })
  }

  chooseConfig = (e) => {
    const {value} = e.target;
    const {template} = this.state;
    if (config) {
      this.setState({
        template: {
          ...template,
          ...config.settings
        }
      })
    }
  }

  header = () => {
    const {machine, machines} = this.props;
    let header;
    if (machines && machines.length) {
      header = 'Выбрано ' + machines.length + ' майнеров';
    } else if (machine) {
      header = 'Майнер # ' + machine.id;
    } else {
      header = 'Новый майнер';
    }
    return header;
  }

  onSubmitHanlder = () => {
    this.setState({
      progress: true
    })
  }

  onErrorHandler = (e) => {
    this.setState({
      progress: false,
      errors: e.errors || {server: ['error']}
    })
  }

  render () {
    const {template, templateId, ids, progress, errors} = this.state;
    const {toogle, templates} = this.props;
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
            {progress && <SavingProgress config={template} ids={ids} onError={this.onErrorHandler}/>}
            {
              templates.length > 0 ? <div className="col-12 form-group">
                <Alert color="info">
                  <label>шаблон</label>
                  <select className="form-control" value={templateId} onChange={this.chooseConfig}>
                    {
                      templates.map(c => {
                        return (
                          <option value={c.id}>{c.name}</option>
                        )
                      })
                    }
                  </select>
                </Alert>
              </div> :
              <div className="col-12 form-group">
                <Alert color="info">
                  <p> у вас пока ни одного шаблона </p>
                </Alert>
              </div>
            }
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
          </div>
          <div className="row">
            <div className="col-4 form-group">
              <label>url 1 </label>
              <input className="form-control" value={template.url1} name="url1" onChange={this.onChangeFieldHandler}/>
            </div>
            <div className="col-4 form-group">
              <label>worker 1 </label>
              <input className="form-control" value={template.worker1} name="worker1" onChange={this.onChangeFieldHandler}/>
            </div>
            <div className="col-4 form-group">
              <label>password 1 </label>
              <input className="form-control" value={template.password1} name="password1" onChange={this.onChangeFieldHandler}/>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-4 form-group">
              <label>url 2 </label>
              <input className="form-control" value={template.url2} name="url2" onChange={this.onChangeFieldHandler}/>
            </div>
            <div className="col-4 form-group">
              <label>worker 2 </label>
              <input className="form-control" value={template.worker2} name="worker2" onChange={this.onChangeFieldHandler}/>
            </div>
            <div className="col-4 form-group">
              <label>password 2 </label>
              <input className="form-control" value={template.password2} name="password2" onChange={this.onChangeFieldHandler}/>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-4 form-group">
              <label>url 3 </label>
              <input className="form-control" value={template.url3} name="url3" onChange={this.onChangeFieldHandler}/>
            </div>
            <div className="col-4 form-group">
              <label>worker 3 </label>
              <input className="form-control" value={template.worker3} name="worker3" onChange={this.onChangeFieldHandler}/>
            </div>
            <div className="col-4 form-group">
              <label>password 3 </label>
              <input className="form-control" value={template.password3} name="password3" onChange={this.onChangeFieldHandler}/>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-4">
              <div className="form-group checkbox-big">
                <label>Custom fan </label>
                <br/>
                <input type="checkbox" checked={template.fan}
                  onChange={(e) => {this.setState({template: {
                      ...template,
                      fan: e.target.checked
                    }})
                  }}
                  />
              </div>
            </div>
            {
              template.fan &&  <div className="col-4">
                <div className="form-group">
                  <label>Fan value </label>
                  <input className="form-control" name="fan_value" onChange={ this.onChangeFieldHandler} value={template.fan_value}/>
                </div>
              </div>
            }
            <div className="col-4">
             <div className="form-group">
               <label>Freq </label>
               <input className="form-control" name="freq" onChange={ this.onChangeFieldHandler} value={template.freq}/>
             </div>
           </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onSubmitHanlder}>Сохранить</Button>
          <Button color="secondary" onClick={toogle}>Отмена</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default MachineConfigPopup;
