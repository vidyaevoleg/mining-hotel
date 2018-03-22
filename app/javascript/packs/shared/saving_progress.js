import React, {Component} from 'react'
import API from '../common/api'
import {
  Alert
} from 'reactstrap'

class SavingProgress extends Component {

  constructor (props) {
    super(props);
    this.state = {
      ids: props.ids,
      config: props.config,
      current: 0
    }
  }

  componentDidMount () {
    this.saveItem();
  }

  saveItem = () => {
    const {ids, config, current} = this.state;
    const {onError} = this.props;
    const id = ids[current];
    const success = (res) => {
      if (current + 1 < ids.length) {
        this.setState({
          current: current + 1
        })
        this.saveItem();
      } else {
        window.location.reload();
      }
    }
    API.machines.updateTemplate({...config, id}, success, onError);
  }

  render () {
    const {ids, current} = this.state;

    const value = current == 0 ? 0 : parseInt(100 * (current + 1) / ids.length);

    return (
      <div className="col-12">
        <Alert color="info">
          <div className="progress">
            <div className="progress-bar" role="progressbar" aria-valuenow={value}
            aria-valuemin="0" aria-valuemax="100" style={{width: value + '%'}}>
              {value}%
            </div>
          </div>
        </Alert>
      </div>
    )
  }
}

export default SavingProgress
