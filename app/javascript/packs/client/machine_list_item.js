import React, {Component} from 'react';

export default class MachineListItem extends Component {

  render () {
    const {machine, onChoose, chosen, editMachine, editConfig} = this.props;

    let color;
    if (machine.active && machine.success) {
      color = 'text-success'
    } else if (machine.active && !machine.success) {
      color = 'text-warning'
    } else if (!machine.active) {
      color = 'text-danger'
    }

    return (
      <div className="t-row">
        <div className="t-col">
          <input type="checkbox" checked={chosen} onChange={onChoose}/>
        </div>
        <div className="t-col"><span className={color}>{machine.model}</span></div>
        <div className="t-col">{machine.template && machine.template.url1}</div>
        <div className="t-col">{machine.temperatures && machine.temperatures.toLocaleString()}</div>
        <div className="t-col">{machine.hashrate}</div>
        <div className="t-col">{machine.time}</div>
        <div className="t-col">
          <i className="fa fa-cog" aria-hidden="true" onClick={editConfig}></i>
          <a href={'/machines/' + machine.id} className="text-info">
            <i className="fa fa-area-chart" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    )
  }
}
