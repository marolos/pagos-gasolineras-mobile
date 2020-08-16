import  React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function NextIcon(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M.554 10.554h17.554l-4.764 4.764a.553.553 0 000 .784.553.553 0 00.784 0l5.709-5.709a.553.553 0 000-.784L14.128 3.9a.558.558 0 00-.39-.164.541.541 0 00-.39.164.553.553 0 000 .785l4.764 4.764H.554a.552.552 0 100 1.105z"
          fill="#F2F2F2"
          stroke="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" transform="rotate(-180 10 10)" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default NextIcon
