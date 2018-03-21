import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Machines from 'admin/machines'

class MachinesListAdmin extends Component {
  constructor (props) {
    super(props);
    this.state = {
      machines: gon.machines,
      templates: gon.templates
    }
  }

  render () {
    const {machines, templates} = this.state;
    return <Machines machines={machines} templates={templates}/>
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MachinesListAdmin />,
    document.body.getElementById('machines_list_admin')
  )
})
