"use client"

import React from 'react'
import { Card as MuiCard, CardContent as MuiCardContent, CardHeader as MuiCardHeader, CardActions } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.12)',
  '&:hover': {
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.16)',
    transition: 'box-shadow 0.2s ease',
  },
}))

const Card = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof MuiCard>>(
  ({ children, ...props }, ref) => (
    <StyledCard ref={ref} {...props}>
      {children}
    </StyledCard>
  )
)

const CardHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof MuiCardHeader>>(
  ({ children, ...props }, ref) => (
    <MuiCardHeader ref={ref} {...props}>
      {children}
    </MuiCardHeader>
  )
)

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props} style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.2 }}>
      {children}
    </div>
  )
)

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props} style={{ fontSize: '0.875rem', color: 'text.secondary' }}>
      {children}
    </div>
  )
)

const CardContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof MuiCardContent>>(
  ({ children, ...props }, ref) => (
    <MuiCardContent ref={ref} {...props}>
      {children}
    </MuiCardContent>
  )
)

const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CardActions>>(
  ({ children, ...props }, ref) => (
    <CardActions ref={ref} {...props}>
      {children}
    </CardActions>
  )
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }