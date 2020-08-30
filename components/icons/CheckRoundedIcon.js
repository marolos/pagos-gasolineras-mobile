import React from "react"
import Svg, { Path } from "react-native-svg"

function CheckRoundedIcon(props) {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M12.5 0C5.607 0 0 5.607 0 12.5 0 19.392 5.607 25 12.5 25 19.392 25 25 19.392 25 12.5 25 5.607 19.392 0 12.5 0zm0 23.611c-6.127 0-11.111-4.984-11.111-11.111 0-6.127 4.984-11.111 11.111-11.111 6.127 0 11.111 4.984 11.111 11.111 0 6.127-4.984 11.111-11.111 11.111z"
        fill="#000"
      />
      <Path
        d="M17.671 7l-6.36 6.351L7.33 9.375 4 12.699 11.311 20 21 10.324 17.671 7zM5.902 12.699l1.427-1.425 3.982 3.977 6.36-6.351 1.427 1.424L11.31 18.1 5.902 12.7z"
        fill="#000"
      />
    </Svg>
  )
}

export default CheckRoundedIcon
