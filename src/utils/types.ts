import React from 'react'

type stateSetter<T> = React.Dispatch<React.SetStateAction<T>>
export type statePair<T> = [T, stateSetter<T>]
