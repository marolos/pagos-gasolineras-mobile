import React from "react"
import Svg, { Path } from "react-native-svg"

function EditIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      stroke="#000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <Path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </Svg>
  )
}

export default EditIcon