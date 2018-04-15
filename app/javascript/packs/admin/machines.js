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
      users: gon.users,
      selected: [],
      filter: {
        model: null,
        user_id: null,
        sort: 'status'
      },
      selectedMachines: [],
      rebootedMachines: [],
      selectedMachine: null,
      selectedTemplate: null,
      newConfig: null,
      models: _.uniq(gon.machines.map(m => m.model))
    }
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
    const elem = document.getElementById("js-templates");
    if (elem) {
      elem.addEventListener("click", () => {
        this.setState({
          selectedTemplate: true
        })
      })
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

  chooseAll = (e) => {
    if (e.target.checked) {
      this.setState({
        selected: this.filterMachines().map(m => m.id)
      });
    } else {
      this.setState({selected: []});
    }
  }

  filterMachines = () => {
    const {filter, machines} = this.state;
    let filtred = machines;
    for (let key in filter) {
      if (filter[key] && key == 'model' && filter[key] != 'все') {
        filtred = filtred.filter(m => m.model == filter[key])
      }
      if (filter[key] && key == 'user_id' && filter[key] != 'все') {
        filtred = filtred.filter(m => m.user_id == filter[key])
      }
    }

    if (filter.sort == 'status') {
      filtred = filtred.sort((a, b) => {
        if (a.active === b.active) {
          return a.id > b.id ? -1 : 1;
        } else {
          if (a.active && !b.active) {
            return 1;
          } else {
            return -1;
          }
        }
      })
    }
    if (filter.sort == 'place') {
      filtred = filtred.sort((x, y) => {
        const xSum = parseInt(x.place.split('-').map(a => parseInt(a)).join(''));
        const ySum = parseInt(y.place.split('-').map(a => parseInt(a)).join(''));
        return xSum < ySum ? -1 : 1
      });
    }
    if (filter.sort == 'blocks') {
      filtred = filtred.sort((x, y) => {
        const xSum = x.blocks_count;
        const ySum = y.blocks_count;
        if (xSum == ySum) {
          return x.id > y.id ? -1 : 1;
        } else return xSum > ySum ? -1 : 1;
      });
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
      selectedTemplate: machine
    })
  }

  tooglePopup = () => {
    this.setState({
      selectedMachines: [],
      selectedMachine: null,
      selectedTemplate: null,
      newConfig: null,
      selectedTemplate: null,
      rebootedMachines: []
    })
  }

  editConfigHandler = (machine) => {
    this.setState({
      selectedTemplate: machine
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

  changeSortHanlder = (e) => {
    const {value} = e.target;
    this.setState({
      filter: {
        ...this.state.fitler,
        sort: value
      }
    })
  }

  changeSearchHanlder = (e) => {
    const {name, value} = e.target;
    const {filter} = this.state;
    this.setState({
      filter: {
        ...this.state.filter,
        [name]: value
      }
    })
    window.history.pushState({}, '', '?' + name + '=' + value);
  }

  render () {
    const {
      templates, selected, models, filter,
      selectedMachine, selectedMachines,
      rebootedMachines, selectedTemplate, users
    } = this.state;
    const machines = this.filterMachines();

    return (
      <div className="container">
        <div className="cont">
          <div className="controls">
            <div className="select">
              <label>модель</label>
              <select value={filter.model} name="model" className="form-control" onChange={this.changeSearchHanlder}>
                <option value={null}>все</option>
                 {models.map(m => (
                   <option key={m} value={m}>{m}</option>
                 ))}
              </select>
            </div>
            <div className="select">
              <label>юзер</label>
              <select value={filter.user_id} className="form-control" name="user_id" onChange={this.changeSearchHanlder}>
                <label>юзер</label>
                <option value={null}>все</option>
                 {users.map(u => (
                   <option key={u.id} value={u.id}>{u.id + ':' + u.email}</option>
                 ))}
              </select>
            </div>
            <div className="select">
              <label> сортировка</label>
              <select value={filter.sort} className="form-control" name="user_id" onChange={this.changeSortHanlder}>
                <option value="status">по статусу</option>
                <option value="place">по месту</option>
                <option value="blocks">по блокам</option>
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
        </div>
        <div className="container-body">
          <table className="table table-considered machines-list">
            <thead>
              <th width="5%">
                <div className="form-group checkbox-big">
                  <input type="checkbox" className="form-control" checked={selected.length == machines.length} onChange={this.chooseAll}/>
                </div>
              </th>
              <th className="label">
                id
              </th>
              <th className="label">
                место
              </th>
              <th className="label">
                модель
              </th>
              <th className="label">
                инфо
              </th>
              <th className="label">
                температура
              </th>
              <th className="label">
                хэшрейт
              </th>
              <th className="label">
                обновление
              </th>
              <th className="label">
                блоки
              </th>
              <th>
              </th>
            </thead>
            <tbody>
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
            </tbody>
          </table>
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
            selectedTemplate &&
              <TemplatesPopup templates={templates} toogle={this.tooglePopup} onSuccess={this.saveTemplateSuccess}/>
          }
        </div>
      </div>
    )
  }
}
