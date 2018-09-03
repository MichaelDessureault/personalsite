import React, { Component } from 'react'
import PropTypes from 'prop-types'
import colorWheelStyles from '../../styles/ColourWheel.css'
import images from '../../../../images'
import { clamp } from '../../../../helpers/utils'


const RGBInput = ({ label, value, disabled, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="number"
        className={colorWheelStyles.RGBInput}
        value={value}
        disabled={disabled}
        onFocus={(e) => {
          e.target.select();
        }}
        onChange={(e) => {
          let value = parseInt(e.target.value, 10);

          if (!isNaN(value)) {
            value = clamp(value, 0, 255)
          }

          e.target.value = value;
          onChange(label, value)
        }}
      />
    </div>
  )
}

class CustomColourWheel extends Component {

  static propTypes = {
    colourWheelImageNumber: PropTypes.number,
  }

  static defaultProps = {
    colourWheelImageNumber: 1,
  }

  constructor(props) {
    super(props)

    this.state = {
      isPreviewable: true,
      hex: "#000000",
      rgb: {
        r: 0,
        g: 0,
        b: 0,
      },
    }
  }

  componentDidMount() {
    // canvas setup once it's mounted
    this.setupCanvas(this.getColourWheelImage(this.props.colourWheelImageNumber));
    this.setState({ setup: true })
  }

  getColourWheelImage = (imageNumber) => {
    switch (imageNumber) {
      case 2: return images.colourWheel.colorwheel2;
      case 3: return images.colourWheel.colorwheel3;
      case 4: return images.colourWheel.colorwheel4;
      case 5: return images.colourWheel.colorwheel5;
      default: return images.colourWheel.colorwheel1;
    }
  }

  setupCanvas = (imageSrc) => {
    // get the canvas element
    var canvas = this.getCanvas()
    var ctx = canvas.getContext('2d');

    // create a new image element and load it into the canvas with the src image.
    var image = new Image();
    image.onload = function () {
      ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image
    }
    image.src = imageSrc;
  }

  // Retursn the canvas element
  getCanvas = () => {
    return document.getElementById('colourWheel')
  }

  /**
   * clickedColourWheel
   *  - A colour was selected now disable the colour wheel
   *  - Disable all input options as well.
   */
  clickedColourWheel = (e) => {
    e.preventDefault()
    this.setState({
      isPreviewable: false,

    })
  }

  // Finds the position of the mouse on the canvas.
  findPos = (obj) => {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
      return { x: curleft, y: curtop };
    }
    return undefined;
  }

  rgbToHex = (r, g, b) => {
    if (r > 255 || g > 255 || b > 255) {
      return
    }
    return "#" + ("000000" + ((r << 16) | (g << 8) | b).toString(16)).slice(-6);
  }

  mouseListener = (e) => {
    if (!this.state.isPreviewable) return;

    // get the canvas and find the position of the canvas
    var canvas = this.getCanvas()
    var pos = this.findPos(canvas);

    // get the point of where the mouse is 
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;

    // get the canvas context to retreive the pixel 
    // colour value at the mouse point
    var c = canvas.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data;

    // convert to hex and setState properties
    var hex = this.rgbToHex(p[0], p[1], p[2])
    this.setState({ hex: hex, rgb: { r: p[0], g: p[1], b: p[2] } })
  }

  /* Chatbot trigger event */
  done = (e) => {
    e.preventDefault()
    this.props.triggerNextStep({ colour: this.state.selectedColour });
  }

  // when using the RGB input fields this allows for the colour to update.
  inputChanged = (label, value) => {
    value = isNaN(value) ? 0 : value
    var r = (label === "R") ? value : this.state.rgb.r
    var g = (label === "G") ? value : this.state.rgb.g
    var b = (label === "B") ? value : this.state.rgb.b
    var hex = this.rgbToHex(r, g, b)
    this.setState({ hex: hex, rgb: { r: r, g: g, b: b } })
  }

  render() {
    console.log('hello there mate')
    return (
      <div className={colorWheelStyles.container}>
        <div
          id={"colourPreview"}
          className={colorWheelStyles.previewText}
          style={{ color: this.state.hex }}>
          {"Favourite Colour"}
        </div>

        <canvas
          id={"colourWheel"} width="150" height="150"
          className={colorWheelStyles.colourWheel}
          onClick={this.clickedColourWheel}
          onMouseMove={this.mouseListener}>
        </canvas>

        <div className={colorWheelStyles.options}>
          <div>
            <RGBInput
              label={"R"}
              value={this.state.rgb.r}
              disabled={!this.state.isPreviewable}
              onChange={this.inputChanged} />

            <RGBInput
              label={"G"}
              value={this.state.rgb.g}
              disabled={!this.state.isPreviewable}
              onChange={this.inputChanged} />

            <RGBInput
              label={"B"}
              value={this.state.rgb.b}
              disabled={!this.state.isPreviewable}
              onChange={this.inputChanged} />
          </div>
          <div>
            <button
              type="button"
              id="doneBtn"
              onClick={(e) => {
                e.preventDefault()
                this.setState({ isPreviewable: true })
              }}
            > {"Different Colour"} </button>
            <button
              type="button"
              id="doneBtn"
              onClick={this.done}
            > {"Done"} </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CustomColourWheel