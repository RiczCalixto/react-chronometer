/**
 * React Chronometer
 */
var Chrono = React.createClass({

  getInitialState: function() {
    return {
      seconds: 0,
      milliseconds: 0,
      startTS: null
    };
  },

  componentDidMount: function() {
    window.addEventListener('keydown', this.onKeyDown);
    if(this.state.milliseconds == 99) {
      this.setState({milliseconds: 0})
    }
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  onKeyDown: function(evt){
    evt.preventDefault();
    // start|stop on [space]
    evt.keyCode === 32 && this[!this.state.startTS ? 'start' : 'stop']();
    // reset on [escape]
    evt.keyCode === 27 && this.reset();
  },

  start: function(){
    const {seconds, milliseconds} = this.state;
    if (milliseconds) {
      // prevent multi clicks on start
      return;
    }
    this.intervaloMillseconds = setInterval(() => {
      this.setState({milliseconds: this.state.milliseconds == 99 ? 0 : this.state.milliseconds+1})
      }, 10)
    this.intervaloSegundos = setInterval(() => {
      this.setState({seconds: this.state.seconds+1})
      }, 1000)  
    this.setState({startTS: 'stop '})
  },

  stop: function(){
    clearInterval(this.intervaloMillseconds);
    clearInterval(this.intervaloSegundos);
    this.setState({startTS: 'start'})
  },

  reset: function(){
    clearInterval(this.intervaloMillseconds);
    clearInterval(this.intervaloSegundos);
    this.setState(this.getInitialState());
  },

  addZero: function(n){
    return n < 10 ? '0' + n : n;
  },

  render: function(){

    if(this.state.milliseconds == 99 && this.state.seconds == 99) {
      {this.stop()}
    }

    return (
      <section className="Chrono">
        <h1>{this.addZero(this.state.seconds)}:{this.addZero(this.state.milliseconds)}</h1>
        <div className="buttons">
          <button onClick={this.start}>START</button>
          <button onClick={this.stop}>STOP</button>
          <button onClick={this.reset}>RESET</button>
        </div>
      </section>
    )
  }

});
