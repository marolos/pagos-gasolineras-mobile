import React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function AddIcon(props) {
  return (
    <Svg width={35} height={35} viewBox="0 0 30 30" fill="none" {...props}>
      <Circle cx={15} cy={15} r={14.5} fill="#fff" stroke="#000" />
      <Path stroke="#000" d="M6.315 15.29h17.369M15.29 23.684V6.316" />
    </Svg>
  )
}

export default AddIcon
