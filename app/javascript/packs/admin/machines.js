import React, {Component} from 'react';
import MachineListItem from './machine_list_item';

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
      selectedTemplate: null,
      selectedMachine: null,
      newConfig: null,
      models: gon.models
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
      if (filter[key] && key == 'model' && filter[key] != 'all') {
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
      selectedTemplate: machine
    })
  }

  tooglePopup = () => {
    this.setState({
      selectedMachines: [],
      selectedMachine: null,
      selectedTemplate: null,
      newConfig: null,
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

  changeSearchHanlder = (e) => {
    const model = e.target.value;
    window.history.pushState({}, '', '?model=' + model)
    this.setState({
      filter: {
        model
      }
    })
  }

  render () {
    const {templates, selected} = this.state;

    const machines = this.filterMachines();

    return (
      <div className="container">
        <div className="container-title">
          <div className="container-title-item">
            <h3> шаблоны </h3>
          </div>
          {
            templates.map(t => {
              return (
                <div className="container-title-item">
                  <button className="btn btn-info">
                    {t.name}
                  </button>
                </div>
              )
            })
          }
          <div className="container-title-item">
            <button className="btn btn-success">
              новый шаблон
            </button>
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
        </div>
      </div>
    )
  }
}
