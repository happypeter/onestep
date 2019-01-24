import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  hero: {
    backgroundColor: '#000',
    padding: '24px 0'
  },
  content: {
    width: '100%',
    margin: '0 auto',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column-reverse',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      width: 700,
      alignItems: 'center'
    },
    [theme.breakpoints.up('lg')]: {
      width: 1000
    },
    [theme.breakpoints.up('xl')]: {
      width: 1100
    }
  },
  textWrap: {
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  },
  header: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 22,
    fontFamily: 'sans-serif',
    lineHeight: 1.8,
    marginTop: 32,
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      fontSize: 32
    }
  },
  subtitle: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2,
    color: '#fff',
    opacity: 0.7,
    fontSize: 16,
    fontFamily: 'sans-serif',
    lineHeight: 1.6,
    [theme.breakpoints.up('md')]: {
      fontSize: 18
    }
  },
  img: {
    display: 'block',
    width: 249,
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      flexShrink: 0,
      width: 400
    },
    [theme.breakpoints.up('xl')]: {
      width: 600
    }
  }
})

const Hero = ({ classes: s }) => {
  return (
    <div className={s.hero}>
      <div className={s.content}>
        <div className={s.textWrap}>
          <div className={s.header}>好奇猫学院</div>
          <div className={s.subtitle}>
            有温度的视频教程，Peter
            的采坑实录，用心帮你节省自学时间。关注区块链和大前端。
          </div>
        </div>
        <img
          src="https://img.haoqicat.com/2018103102.jpg"
          alt="avatar"
          className={s.img}
        />
      </div>
    </div>
  )
}

export default withStyles(styles)(Hero)
