import React, {Component} from 'react';

export default class Machines extends Component {
  const {templates, machines} = this.props;
  render () {
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
        </div>
      </div>
    )
  }
}
