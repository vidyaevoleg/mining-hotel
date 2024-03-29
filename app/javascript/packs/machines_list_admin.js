import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Machines from './admin/machines'

class MachinesListAdmin extends Component {
  constructor (props) {
    super(props);
    this.state = {
      machines: gon.machines,
      templates: gon.templates
    }
  }

  render () {
    return <Machines />
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MachinesListAdmin />,
    document.getElementById('machines_list_admin')
  )
})
