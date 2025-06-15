"use client"

import React from 'react'
import { Chip, ChipProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  fontSize: '0.75rem',
  fontWeight: 600,
  height: 'auto',
  padding: theme.spacing(0.5, 1),
}))

export interface BadgeProps extends Omit<ChipProps, 'variant'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', ...props }, ref) => {
    const getMuiVariant = () => {
      switch (variant) {
        case 'outline':
          return 'outlined'
        default:
          return 'filled'
      }
    }

    const getMuiColor = () => {
      switch (variant) {
        case 'destructive':
          return 'error'
        case 'secondary':
          return 'secondary'
        default:
          return 'primary'
      }
    }

    return (
      <StyledChip
        ref={ref}
        variant={getMuiVariant()}
        color={getMuiColor()}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }