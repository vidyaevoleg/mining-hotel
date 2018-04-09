import React, {Component} from 'react';
import MachineListItem from './machine_list_item';
import {uniq} from 'lodash';
import MachineConfigPopup from '../shared/machine_config_popup';
import RebootingProgress from '../shared/rebooting_progress';
import TemplatesPopup from '../shared/templates_popup';
import API from '../common/api'

export default class Machines extends Component {

  constructor (props) {
    super(props);
    gon.pools = [];
    this.state = {
      machines: gon.machines,
      templates: gon.templates,
      selected: [],
      filter: {
        model: null
      },
      selectedMachines: [],
      rebootedMachines: [],
      selectedMachine: null,
      editedTemplate: null,
      newConfig: null,
      models: _.uniq(gon.machines.map(m => m.model))
    }
  }


  render () {
    const {
      templates, selected, models, filter,
      selectedMachine, selectedMachines,
      rebootedMachines, editedTemplate
    } = this.state;
    const machines = this.filterMachines();

    return (
      <div className="cont">
        <div className="controls">
          <h1>Майнеры</h1>
          <div className="select">
            <select value={filter.model} className="form-control" onChange={this.changeSearchHanlder}>
              <label>модель</label>
              <option value={null}>все</option>
               {models.map(m => (
                 <option key={m} value={m}>{m}</option>
               ))}
            </select>
          </div>
          {selected && selected.length > 0 && (
            <button className="edit" onClick={this.editGroupHandler}>
              Редактировать ({selected.length})
            </button>
          )}
          {selected && selected.length > 0 && (
            <button className="reboot" onClick={this.rebootHandler}>
              Перезагрузка ({selected.length})
            </button>
          )}
        </div>
        <div className="t">
          <div className="t-head">
            <div className="t-row">
              <div className="t-col t-col-checkbox">
                <div className="check">
                  <input id="check-main" type="checkbox" checked={selected.length == machines.length} onChange={this.chooseAll}/>
                  <label htmlFor="check-main"></label>
                </div>
              </div>
              <div className="t-col t-col-model">Модель</div>
              <div className="t-col t-col-info">Инфо</div>
              <div className="t-col t-col-temp">Температура</div>
              <div className="t-col t-col-hashrate">Хэшрейт</div>
              <div className="t-col t-col-lastupd">Последнее обновление</div>
            </div>
          </div>
          <div className="t-body">
            {
              machines.map(m => {
                const chosen = selected.includes(m.id);
                return <MachineListItem
                  key={m.id}
                  machine={m}
                  onChoose={() => {this.chooseMachineHandler(m.id)}}
                  chosen={chosen}
                  editConfig={() => this.editConfigHandler(m)}
                  editMachine={() => this.editMachineHandler(m)}
                />
              })
            }
          </div>
        </div>
        {selectedMachine &&
          <MachineConfigPopup toogle={this.tooglePopup} machine={selectedMachine} templates={templates} />
        }
        {selectedMachines && selectedMachines.length > 0 &&
          <MachineConfigPopup toogle={this.tooglePopup} machines={selectedMachines} templates={templates}/>
        }
        {
          rebootedMachines && rebootedMachines.length > 0 &&
          <RebootingProgress toogle={this.tooglePopup} ids={rebootedMachines}/>
        }
        {
          editedTemplate &&
            <TemplatesPopup templates={templates} toogle={this.tooglePopup} onSuccess={this.saveTemplateSuccess}/>
        }
      </div>
    )
  }

  _getJsonFromUrl () {
    const query = window.location.search.substr(1);
    const result = {};
    query.split("&").forEach(function(part) {
      let item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }

  componentDidMount () {
    const params = this._getJsonFromUrl();
    if (params.model) {
      this.setState({
        filter: {
          model: params.model
        }
      })
    }
    const elem = document.getElementById("js-templates")
    if (elem) {
      elem.addEventListener("click", () => {
        this.setState({
          editedTemplate: true
        })
      })
    }
  }

  chooseAll = (e) => {
    if (e.target.checked) {
      this.setState({
        selected: this.filterMachines().map(m => m.id)
      });
    } else {
      this.setState({selected: []});
    }
  }

  saveTemplateSuccess = (template) => {
    const success = (res) => {
      this.setState({
        templates: res,
      })
    }
    API.templates.index(success);
  }

  filterMachines = () => {
    const {filter, machines} = this.state;
    let filtred = machines;
    for (let key in filter) {
      if (filter[key] && key == 'model' && filter[key] != 'все') {
        filtred = filtred.filter(m => m.model == filter[key])
      }
    }
    return filtred;
  }

  chooseMachineHandler = (id) => {
    let {selected} = this.state;
    if (selected.includes(id)) {
      this.setState({
        selected: selected.filter(i => i != id)
      })
    } else {
      this.setState({
        selected: selected.concat(id)
      })
    }
  }

  editGroupHandler = () => {
    const {selected} = this.state;
    const machines = this.state.machines.filter(m => selected.includes(m.id));
    if (machines.length) {
      this.setState({selectedMachines: machines});
    }
  }

  newMachineNandler = () => {
    const {machineDum} = dums;
    this.setState({
      selectedMachine: machineDum
    })
  }

  afterSaveMachineHandler = (machine) => {
    this.setState({
      selectedMachine: null,
      machines: [
        ...this.state.machines,
        machine
      ],
      selectedMachine: machine
    })
  }

  tooglePopup = () => {
    this.setState({
      selectedMachines: [],
      selectedMachine: null,
      newConfig: null,
      editedTemplate: null,
      rebootedMachines: []
    })
  }

  editConfigHandler = (machine) => {
    this.setState({
      selectedMachine: machine
    })
  }

  editMachineHandler = (machine) => {
    this.setState({
      selectedMachine: machine
    })
  }

  rebootHandler = () => {
    const {selected} = this.state;
    if (confirm('Уверен?')) {
      this.setState({
        rebootedMachines: selected
      })
    }
  }

  changeSearchHanlder = (e) => {
    const model = e.target.value;
    window.history.pushState({}, '', '?model=' + model)
    this.setState({
      filter: {
        model
      }
    })
  }

}
