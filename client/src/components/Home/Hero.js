import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  hero: {
    position: 'relative',
    height: 1000
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
    width: 1400,
    margin: '0 auto',
    justifyContent: 'space-between',
    marginLeft: -700,
    left: '50%',
    top: 200,
    position: 'absolute',
    zIndex: 1000
  },
  textWrap: {
    border: '2px solid red',
    display: 'flex',
    width: 400,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItem: 'center'
  },
  text: {},
  subheading: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  imgWrap: {
    border: '2px solid green',
    width: 800,
    '& img': {
      width: '100%'
    }
  }
})

class Hero extends React.Component {
  render() {
    const { classes: s } = this.props
    return (
      <div className={s.hero}>
        <div className={s.content}>
          <div className={s.textWrap}>
            <div className={s.text}>
              <Typography variant="display2">好奇猫编程视频站</Typography>
              <Typography className={s.subheading} variant="subheading">
                Peter
                的采坑实录，帮你节省自学时间。的采坑实录，帮你节省自学时间。
              </Typography>
              <Button size="large" variant="raised" color="primary">
                登录
              </Button>
            </div>
          </div>
          <div className={s.imgWrap}>
            <img src="/dashboard.jpg" alt="db" />
          </div>
        </div>
        <div className={s.bgShape} />
        <div className={s.bgCircle} />
        <div className={s.bgCircleTwo} />
      </div>
    )
  }
}

export default withStyles(styles)(Hero)
