"use client"

import React from 'react'
import { Divider, DividerProps } from '@mui/material'

export interface SeparatorProps extends DividerProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <Divider
      ref={ref}
      orientation={orientation}
      {...props}
    />
  )
)

Separator.displayName = 'Separator'

export { Separator }