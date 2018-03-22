import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Machines from './client/machines'

class MachinesListUser extends Component {
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
    <MachinesListUser/>,
    document.getElementById('machines_list_user')
  )
})
