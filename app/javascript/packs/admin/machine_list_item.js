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
    const user = gon.users.find(u => u.id == machine.user_id);

    let color;
    if (machine.active && machine.success) {
      color = 'table-success'
    } else if (machine.active && !machine.success) {
      color = 'table-warning'
    } else if (!machine.active) {
      color = 'table-danger'
    }

    return (
      <tr className={color}>
        <td>
          <div className="form-group checkbox-lil">
            <input type="checkbox" className="form-control" checked={chosen} onChange={onChoose}/>
          </div>
        </td>
        <td>
          <a href={'/machines/' + machine.id}>
            {machine.place}
          </a>
        </td>
        <th>
          {machine.model}
        </th>
        <td>
          <code>
            {machine.template && machine.template.url1}
          </code>
          <br/>
          <br/>
          <code>
            {user && <b>
                <a href={'/accounts/' + user.id}>
                  {user.id + ':' + user.email}
                </a>
              </b>
            }
          </code>
        </td>
        <th>
          <code>
            {machine.temperatures && machine.temperatures.toLocaleString()}
          </code>
        </th>
        <th>
          {machine.hashrate}
        </th>
        <td>
          {machine.time}
        </td>
        <th>
        </th>
        <th>
        </th>
        <th>
          <div className="machines-action">
            <i className="fa fa-cog" aria-hidden="true" onClick={editConfig}></i>
          </div>
          <div className="machines-action">
            <i className="fa fa-pencil" onClick={editMachine}></i>
          </div>
          <div className="machines-action">
            <i className="fa fa-area-chart" aria-hidden="true" onClick={this.tooglePopup}></i>
          </div>
        </th>
        {popup && <MachinePopup toogle={this.tooglePopup} machine={machine} />}
      </tr>
    )
  }
}
