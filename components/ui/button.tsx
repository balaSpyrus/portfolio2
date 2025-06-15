"use client"

import React from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: theme.spacing(3),
  fontWeight: 600,
  transition: 'all 0.2s ease',
  '&.MuiButton-contained': {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },
  },
}))

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', ...props }, ref) => {
    const getMuiVariant = () => {
      switch (variant) {
        case 'outline':
          return 'outlined'
        case 'ghost':
        case 'link':
          return 'text'
        default:
          return 'contained'
      }
    }

    const getMuiSize = () => {
      switch (size) {
        case 'sm':
          return 'small'
        case 'lg':
          return 'large'
        default:
          return 'medium'
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
      <StyledButton
        ref={ref}
        variant={getMuiVariant()}
        size={getMuiSize()}
        color={getMuiColor()}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }