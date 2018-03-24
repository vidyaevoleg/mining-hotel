import React, {Component} from 'react';

export default class MachineListItem extends Component {

  render () {
    const {machine, onChoose, chosen, editMachine, editConfig} = this.props;

    let status = '';
    if (machine.active && machine.success) {
      status = 't-col-checkbox-success';
    } else if (machine.active && !machine.success) {
      status = 't-col-checkbox-warning';
    } else if (!machine.active) {
      status = 't-col-checkbox-danger';
    }

    return (
      <div className="t-row">
        <div className={`t-col t-col-checkbox ${status}`}>
          <div className="check">
            <input id={machine.id} type="checkbox" checked={chosen} onChange={onChoose}/>
            <label htmlFor={machine.id}></label>
          </div>
        </div>
        <div className="t-col t-col-model">{machine.model}</div>
        <div className="t-col t-col-info">{machine.template && machine.template.url1}</div>
        <div className="t-col t-col-temp">{machine.temperatures && machine.temperatures.toLocaleString()}</div>
        <div className="t-col t-col-hashrate">{machine.hashrate}</div>
        <div className="t-col t-col-lastupd">
          {machine.time}
          <div className="t-col-controls">
            <i className="fa fa-cog" aria-hidden="true" onClick={editConfig}></i>
            <a href={'/machines/' + machine.id} className="text-info">
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
