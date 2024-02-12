import React from 'react'
import { Paper, Typography, Rating } from '@mui/material'

interface ComputerItemProps {
  imageUrl: string
  description: string
  rating: number
}

const ComputerItem: React.FC<ComputerItemProps> = ({
  imageUrl,
  description,
  rating,
}) => {
  return (
    <Paper style={{ textAlign: 'center', minHeight: '450px' }}>
      <img
        src={imageUrl}
        alt="Computer"
        style={{ width: '200px', height: '200px', margin: '10px' }}
      />
      <Typography variant="h5" component="div" padding="16px">
        {description}
      </Typography>
      <Rating value={rating} readOnly />
    </Paper>
  )
}

export default ComputerItem
