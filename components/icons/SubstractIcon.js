import React, { memo } from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SubstractIcon(props) {
  return (
    <Svg width={35} height={35} viewBox="0 0 30 30" fill="none" {...props}>
      <Circle cx={15} cy={15} r={14.5} fill="#fff" stroke="#000" />
      <Path stroke="#000" d="M7.5 16h15" />
    </Svg>
  )
}

export default memo(SubstractIcon)
