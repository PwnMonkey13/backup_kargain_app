import React from 'react'

const varDump = (props) => <pre>{JSON.stringify(props.data, null, 2)}</pre>

export default varDump
