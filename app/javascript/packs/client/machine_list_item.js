import React, {Component} from 'react';
import MachinePopup from './machine_popup';

export default class MachineListItem extends Component {

  constructor (props) {
    super(props);
    this.state = {
      popup: null
    }
  }

  tooglePopup = () => {
    this.setState({
      popup: !this.state.popup
    })
  }

  render () {
    const {machine, onChoose, chosen, editMachine, editConfig} = this.props;
    const {popup} = this.state;

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
          <i className="fa fa-area-chart" aria-hidden="true" onClick={this.tooglePopup}></i>
        </div>
        {popup && <MachinePopup toogle={this.tooglePopup} machine={machine} />}
      </div>
    )
  }
}
