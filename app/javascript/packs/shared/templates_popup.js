import React, {Component} from 'react'
import dums from '../common/dums'
import Errors from '../shared/errors'
import cn from 'classnames';
import API from '../common/api'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Button
} from 'reactstrap'

class TemplatesPopup extends Component {

  constructor (props) {
    super(props);

    this.state = {
      template: props.templates[0] || dums.templateDum,
      errors: null,
      saved: false
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

  onChangeTemplate = (template) => {
    this.setState({
      template: template
    })
  }

  onSubmitHanlder = () => {
    const {template} = this.state;
    const {onSuccess} = this.props;

    const success= (res) => {
      this.setState({
        saved: true,
        errors: null
      })
      setTimeout(() => {
        this.setState({
          saved: false
        })
      }, 1000);
      onSuccess(res);
    }

    const error = (res) => {
      this.setState({
        errors: res.errors
      })
    }

    if (template.id) {
      API.templates.update(template, success, error);
    } else {
      API.templates.create(template, success, error);
    }
  }

  onAddNewTemplate = () => {
    this.setState({
      template: dums.templateDum
    })
  }

  render () {
    const {template, errors, saved} = this.state;
    const {toogle, templates} = this.props;
    console.log(errors);

    return (
      <Modal isOpen={true} toogle={toogle} size="lg">
        <ModalHeader>
          <h2>
            Шаблоны
          </h2>
        </ModalHeader>
        <ModalBody>
          {
            templates.length > 0 ?
              <Alert color="info">
                {
                  templates.map(temp => {
                    const active = temp.id == template.id;
                    return (
                      <button className={cn('btn', 'btn-warning', {'btn-lg': active})} onClick={() => this.onChangeTemplate(temp)}>
                        {temp.name}
                      </button>
                    )
                  })
                }
                <button className={cn('btn', 'btn-success')} onClick={this.onAddNewTemplate}>
                  новый шаблон
                </button>
              </Alert> :
              <Alert color="info">
                <p> У вас пока ни одного шаблона. </p>
                <p> Шаблон - это набор данных (адрес, воркер, пароль) для подключения майнера к пулу. </p>
                <p> Сохраняйте их для удобства. </p>
              </Alert>
          }
          {saved && <Alert color="success">
            Сохранено!
          </Alert>}
          <Errors errors={errors} />
          <div className="row">
            <div className="col-12 form-group">
              <label>Название </label>
              <input className="form-control" placeholder="Bitcoin Antpool, например" value={template.name} name="name" onChange={this.onChangeFieldHandler}/>
            </div>
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
                  onChange={(e) => {this.onChangeFieldHandler({target: {name: 'fan', value: e.target.checked}})}}
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

export default TemplatesPopup;