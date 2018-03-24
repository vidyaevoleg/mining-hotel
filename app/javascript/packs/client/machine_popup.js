import React, {Component} from 'react';
import API from '../common/api';
import {max} from 'lodash';
import {
  VictoryLine,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryLabel
} from 'victory';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert
} from 'reactstrap'

class MachinePopup extends Component {

  constructor (props) {
    super(props);
    this.state  = {
      hashrateStats: [],
      temps: []
    }
  }

  obtainStats = (_stats) => {
    const stats = _stats.map(s => {
      return {
        ...s,
        time: new Date(s.time)
      }
    });
    const hashrateStats = stats.map(s => {
      return {x: s.time, y: parseInt(s.hashrate)}
    });
    const temps = [];
    const temps_count = max(stats.map(s => s.temps.length));

    for (let i=0; i < temps_count; i++) {
      temps[i] = temps[i] || [];
      for (let j in stats) {
        let stat = stats[j];
        temps[i].push({
          x: stat.time, y: parseInt(stat.temps[i]) || 0
        })
      }
    }
    console.log(temps)
    console.log(hashrateStats)

    this.setState({
      hashrateStats: hashrateStats,
      temps: temps
    })
  }

  componentDidMount () {
    const {machine } = this.props;
    API.machines.stats(machine.id, this.obtainStats);
  }

  render () {
    const {temps, hashrateStats} = this.state;
    const {machine, toogle} = this.props;


    return (
      <Modal isOpen={true} size="lg">
        <div className="popup">
          <h2>
            Майнер #{machine.id}
          </h2>
          <div className="t">
            <div className="t-head">
              <div className="t-row">
                <div className="t-col t-col-model">Модель</div>
                <div className="t-col t-col-info">Инфо</div>
                <div className="t-col t-col-temp">Температура</div>
                <div className="t-col t-col-hashrate">Хэшрейт</div>
                <div className="t-col t-col-lastupd">Последнее обновление</div>
              </div>
            </div>
            <div className="t-body">
              <div className="t-row">
                <div className="t-col t-col-model">{machine.model}</div>
                <div className="t-col t-col-info">{machine.template && machine.template.url1}</div>
                <div className="t-col t-col-temp">{machine.temperatures && machine.temperatures.toLocaleString()}</div>
                <div className="t-col t-col-hashrate">{machine.hashrate}</div>
                <div className="t-col t-col-lastupd">{machine.time}</div>
              </div>
            </div>
          </div>
          <div>
            {hashrateStats.length > 0 ? <div className="popup-section stats-list">
              <h3> Хэшрейт </h3>
              <VictoryChart scale={{ x: "time" }} height={300} width={800} theme={VictoryTheme.material}
                animate={{ duration: 500 }}>
                <VictoryAxis
                  style={{
                    tickLabels: { fontSize: 10, fontWeight: 'bold' },
                  }}
                />

                <VictoryAxis
                  style={{
                    tickLabels: { fontSize: 8, fontWeight: 'bold' },
                    grid: { stroke: '#B3E5FC', strokeWidth: 0.25 }
                  }}
                  dependentAxis
                  tickFormat={(x) => {
                    return x + ' GH/s'
                  }}
                />
                <VictoryLine
                  style={{data: { stroke: "cyan", border: '2px solid cyan'}}}
                  data={hashrateStats}
                />
              </VictoryChart>
            </div> : null}
            {temps.length > 0 ? <div className="popup-section stats-list">
              <h3> Температура чипов </h3>
              <VictoryChart scale={{ x: "time" }} height={300} width={800} theme={VictoryTheme.material}
                animate={{ duration: 500 }}>
                <VictoryAxis
                  style={{
                    tickLabels: { fontSize: 10, fontWeight: 'bold' },
                  }}
                />

                <VictoryAxis
                  style={{
                    tickLabels: { fontSize: 8, fontWeight: 'bold' },
                    grid: { stroke: '#B3E5FC', strokeWidth: 0.25 }
                  }}
                  dependentAxis
                  tickFormat={(x) => {
                    return x + ' ℃'
                  }}
                />
                {temps.map( (temp, index) => {
                  const color = ['blue', 'deepskyblue', 'violet', 'navy'][index]
                  return (
                    <VictoryLine
                      style={{data: { stroke: color, border: '2px solid gray'}}}
                      data={temp}
                    />
                  )
                })}
              </VictoryChart>
            </div> : null}
          </div>
          <div className="popup-footer">
            <button className="button button-cancel" onClick={toogle}>Отмена</button>
          </div>
        </div>
      </Modal>
    )
  }
}
export default MachinePopup;
