import React, {Component} from 'react'
import {debounce} from 'lodash';

const MODELS = [
  {
    id: 's9',
    name: 'Antminer S9'
  }, {
    id: 's3',
    name: 'Bitman S3'
  }, {
    id: 'l1',
    name: 'Antminer L1'
  }
]

class Calc extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      model: MODELS[0].id,
      amount: 0,
      items: [],
      isError: false
    }
    this.cacheData = debounce(this._cacheData, 500);
  }
  render() {
    const {
      model,
      amount,
      items,
      isError
    } = this.state;
    return (
      <div className="calc">
        <div className="calc-item">
          <div className="calc-item-model">МОДЕЛЬ ASIC МАЙНЕРА</div>
          <div className="calc-item-amount">КОЛИЧЕСТВО</div>
        </div>

        {
          items.map((item, itemIndex) => (
            <div className="calc-item" key={itemIndex}>
              <div className="calc-item-model">
                <div className="calc-item-model-select">
                  <select value={MODELS.find(m => m.id === item.model).id} name="calc-model" onChange={ev => this.onModelChange(ev, itemIndex)}>
                    {MODELS.map((m, j) => (
                      <option
                        key={j}
                        value={m.id}
                      >{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="calc-item-amount">
                <input onChange={ev => this.onAmountChange(ev, itemIndex)} type="text" value={item.amount} />
              </div>
            </div>
          ))
        }

        <div className="calc-item">
          <div className="calc-item-model">
            <div className="calc-item-model-select">
              <select value={model} name="calc-model" onChange={this.onModelChange}>
                {MODELS.map((m, j) => (
                  <option
                    key={j}
                    value={m.id}
                  >{m.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="calc-item-amount">
            <input onChange={this.onAmountChange} type="text" value={amount} className={isError ? 'err' : ''} />
          </div>
        </div>

        <button className="calc-add" onClick={this.onAdd}>добавить позицию</button>

      </div>
    );
  }

  onModelChange = (ev, index) => {
    if (index !== undefined) {
      const _items = [...this.state.items];
      _items[index].model = ev.target.value;
      this.setState({ items: _items });
    } else {
      this.setState({ model: ev.target.value });
    }
    this.cacheData();
  }

  onAmountChange = (ev, index) => {
    if (index !== undefined) {
      const _items = [...this.state.items];
      _items[index].amount = ev.target.value;
      this.setState({ items: _items });
    } else {
      this.setState({ amount: ev.target.value });
    }
    this.cacheData();
  }

  onAdd = ev => {
    const { model, amount, items } = this.state;
    ev.preventDefault();
    if (!amount) {
      return this.triggerErr();
    }
    const _items = [...items];
    _items.push({ model, amount });
    this.setState({
      model: MODELS[0].id,
      amount: 0,
      items: _items
    });
    this.cacheData();
  }

  _cacheData = () => {
    const {items, model, amount} = this.state;

    let message = 'Желаемые модели:\n';
    items.forEach(item => {

      message = message.concat(`• Модель: ${MODELS.find(m => m.id === item.model).name}, количество: ${item.amount};\n`);
    });
    if (amount) {
      message = message.concat(`• Модель: ${MODELS.find(m => m.id === model).name}, количество: ${amount};\n`);
    }
    if (message !== 'Желаемые модели:\n') {
      window.SELECTED_MODELS_MESSAGE = message;
      console.clear();
      console.log(message);
    }
  }

  triggerErr = () => {
    this.setState({ isError: true });
    setTimeout(() => {
      this.setState({ isError: false });
      setTimeout(() => {
        this.setState({ isError: true });
        setTimeout(() => {
          this.setState({ isError: false });
          setTimeout(() => {
            this.setState({ isError: true });
            setTimeout(() => {
              this.setState({ isError: false });
            }, 200)
          }, 100)
        }, 200)
      }, 100)
    }, 200)
  }
}

export default Calc;
