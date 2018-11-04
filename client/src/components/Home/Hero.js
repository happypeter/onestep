import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-static'
import dashboardImg from '../../assets/images/dashboard.jpg'

const styles = theme => ({
  hero: {
    position: 'relative',
    height: 600,
    [theme.breakpoints.up('xl')]: {
      height: 700
    },
    overflow: 'hidden'
  },
  bgShape: {
    position: 'absolute',
    backgroundImage: `linear-gradient(100deg, ${
      theme.palette.primary.main
    },#ffffff)`,
    top: -350,
    right: -110,
    borderRadius: '8%',
    width: '50%',
    height: 800,
    transform: 'skew(3deg,30deg)',
    opacity: 1
  },
  bgCircle: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `linear-gradient(100deg, ${theme.palette.primary.main}, ${
      theme.palette.primary.dark
    })`,
    top: -400,
    left: -350,
    borderRadius: '100%',
    height: 800,
    width: 800,
    opacity: 0.2
  },
  bgCircleTwo: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `linear-gradient(100deg, ${theme.palette.primary.main}, ${
      theme.palette.primary.dark
    })`,
    top: 150,
    left: 350,
    borderRadius: '100%',
    height: 100,
    width: 100,
    opacity: 0.8
  },
  content: {
    display: 'flex',
    width: 1000,
    marginLeft: -500,
    margin: '0 auto',
    justifyContent: 'space-between',
    [theme.breakpoints.up('xl')]: {
      width: 1100,
      marginLeft: -550
    },
    left: '50%',
    top: 170,
    position: 'absolute',
    zIndex: 1000
  },
  textWrap: {
    display: 'flex',
    width: 400,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItem: 'center'
  },
  h4: {
    opacity: 0.7
  },
  subtitle1: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  imgWrap: {
    width: 450,
    [theme.breakpoints.up('xl')]: {
      width: 600
    },
    '& img': {
      width: '100%'
    }
  }
})

const Hero = ({ classes: s }) => {
  return (
    <div className={s.hero}>
      <div className={s.content}>
        <div className={s.textWrap}>
          <div>
            <Typography className={s.h4} variant="h4">
              好奇猫编程视频站
            </Typography>
            <Typography className={s.subtitle1} variant="subtitle1">
              Peter 的踩坑实录，帮你节省自学时间。关注大前端方向，前端 React ，
              后端 Express。
            </Typography>
            <Button
              size="large"
              variant="raised"
              color="primary"
              component={Link}
              to="/login"
            >
              登录
            </Button>
          </div>
        </div>
        <Paper className={s.imgWrap}>
          <img src={dashboardImg} alt="dashboard" />
        </Paper>
      </div>
      <div className={s.bgShape} />
      <div className={s.bgCircle} />
      <div className={s.bgCircleTwo} />
    </div>
  )
}

export default withStyles(styles)(Hero)
