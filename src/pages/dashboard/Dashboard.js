import { Box, Breadcrumbs, Card, Container,Link,Typography,CardContent } from '@mui/material'
import React from 'react'
import "./Dashboard.css"

export const Dashboard = () => {
  return (
    <div className='page-information-container'>
      <header className="page-header"><label>Dashboard</label></header>
      <div className='page-breadscrumb'>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/"
          aria-current="page">
          Dashboard
        </Link>
      </Breadcrumbs>
      </div>
      <div className="dashboard-container">
      <div className='dashboard-container-card'>
        <div className='dashboard-card'>
          <div className='card'>
          <Card sx={{background:"#FFF4DE"}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
          </Card>
          </div>
        </div>
        <div className='dashboard-card'>
          <div className='card'>
          <Card sx={{background: "rgba(255, 244, 222,0.6)"}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
          </Card>
          </div>
        </div>
        <div className='dashboard-card'>
          <div className='card'>
          <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
          </Card>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
