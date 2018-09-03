/* This is a unique style file that is used to create the custom objects that chatbot allows to be overwritten */

const rootContainerStyle = {}
const contentStyle = {}
const customElementStyle = {}

/* 
 * Bubble elements are modified by directly changing the css style in index.html 
 * Due to the fact that changing the bubbleElementStyle will change both the
 * bot's style and the users answers. 
 * 
 * We require the bots messages to be a different color then the users answers
 */
const bubbleOptionStyle = {}
const bubbleElementStyle = {}
const footerStyle = {}
const inputStyle = {}

export default {
  rootContainerStyle,
  contentStyle,
  customElementStyle,
  bubbleOptionStyle,
  bubbleElementStyle,
  footerStyle,
  inputStyle,
}