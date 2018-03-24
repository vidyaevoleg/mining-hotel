import React, {Component} from 'react'
import dums from '../common/dums'
import API from '../common/api'
import SavingProgress from './saving_progress'
import Errors from './errors'

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
    const template = (machine && machine.template) || dums.templateDum;
    this.state = {
      ids: machine ? [machine.id] : machines.map(m => m.id),
      template: template,
      progress: false,
      errors: null
    }
  }

  onChangeFieldHandler = (e) => {
    const {name, value} = e.target;
    this.setState({
      template: {
        ...this.state.template,
        [name]: value,
        template_id: name != 'template_id' ? null : value
      },
      errors: null
    })
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

  onChangeTemplate = (e) => {
    const {templates} = this.props;
    const template = templates.find(t => t.id == e.target.value);
    if (template) {
      this.setState({
        template: template
      })
    }
  }

  onSubmitHanlder = () => {
    this.setState({
      progress: true
    })
  }

  onErrorHandler = (e) => {
    this.setState({
      errors: e.errors || {server: ['error']}
    })
  }

  render () {
    const {template, ids, progress, errors} = this.state;
    const {toogle, templates} = this.props;
    const header = this.header();

    return (
      <Modal isOpen={true} toogle={toogle} size="lg">
        <div className="popup">
          <h2>
            {header}
          </h2>
          <div className="row">
            {progress && <SavingProgress config={template} ids={ids} onError={this.onErrorHandler}/>}
            {
              templates.length > 0 ? <div className="col-12 form-group">
                <div className="popup-alert popup-alert-info">
                  <label>шаблон</label>
                  <select className="form-control" value={template.id} onChange={this.onChangeTemplate}>
                    <option value={null}>  </option>
                    {
                      templates.map(c => {
                        return (
                          <option value={c.id}>{c.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div> :
              <div className="col-12 form-group">
                <div className="popup-alert popup-alert-info">
                  <p>У вас пока ни одного шаблона </p>
                </div>
              </div>
            }
            <Errors errors={errors} />
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
                <div className="check">
                  <input id="check-machine-config" type="checkbox" checked={template.fan} onChange={(e) => {onChangeFieldHandler({target: {fan: e.target.checked}})}}/>
                  <label htmlFor="check-machine-config"></label>
                </div>
                {/* <input type="checkbox" checked={template.fan}
                  onChange={(e) => {onChangeFieldHandler({target: {fan: e.target.checked}})}}
                  /> */}
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
          <div className="popup-footer">
            <button className="button button-submit" onClick={this.onSubmitHanlder}>Сохранить</button>
            <button className="button button-cancel" onClick={toogle}>Отмена</button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default MachineConfigPopup;
