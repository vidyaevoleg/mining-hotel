import React, {Component} from 'react'

class Select extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      selected: null,
      isOpened: false
    };
    this.dom = null;
    this.onOuterClick = this.onOuterClick.bind(this);
    this.onToggleOpen = this.onToggleOpen.bind(this);
    this.getDOMNode = this.getDOMNode.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }


  render() {
    const {options, initial} = this.props;
    const {isOpened, selected} = this.state;
    const selectedOption = options.find(option => selected === option.value) || options[0];
    const cls = `rs-root${initial.type ? ' rs-root-' + initial.type : ''}${isOpened ? ' rs-opened' : ''}`;
    return (
      <div className={cls} ref={this.getDOMNode}>
        <div className="rs-option rs-option-selected" onClick={this.onToggleOpen}>
          {selectedOption.image_src ? (
            <img src={selectedOption.image_src} />
          ) : null}
          {selectedOption.title}
        </div>
        {isOpened && options.length ? (
          <div className="rs-optionlist">
            {
              options.map((option, i) => (
                <div key={i} className="rs-option" onClick={() => {this.onSelect(option.value)}}>
                  {option.image_src ? (
                    <img src={option.image_src} />
                  ) : null}
                  {option.title}
                </div>
              ))
            }
          </div>
        ) : null}
      </div>
    );
  }

  getDOMNode(node) {
    if (node) {
      this.dom = node;
    }
  }

  componentDidMount() {
    const {initial, options, input} = this.props;
    this.setState({ selected: initial.selected || null });
    const titledValue = this.props.options.find(o => o.value === initial.selected).title;
    input.value = (initial.type === 'country_code') ? titledValue : (initial.selected || '');
    window.addEventListener('click', this.onOuterClick, false);
  }

  onClose() {
    this.setState({ isOpened: false });
  }

  onOpen() {
    this.setState({ isOpened: true });
  }

  onOuterClick(ev) {
    if (this.state.isOpened && (this.dom && !this.dom.contains(ev.target))) {
      this.onClose();
    }
  }

  onToggleOpen() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  onSelect(value) {
    this.setState({ selected: value });
    this.onClose();
    const {type, place} = this.props.initial;
    const titledValue = this.props.options.find(o => o.value === value).title;
    const event = new CustomEvent('rs:select:' + type, {
      detail: {
        value,
        place
      }
    });
    window.dispatchEvent(event);
    this.props.input.value = (type === 'country_code') ? titledValue : value;
  }
}

export default Select;
