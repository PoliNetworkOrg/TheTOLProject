import React from 'react'

export type stateSetter<T> = React.Dispatch<React.SetStateAction<T>>
export type statePair<T> = [T, stateSetter<T>]
