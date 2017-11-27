
let courses = [
  {
    'id': '0',
    'title': 'Gulp-Flexbox 响应式网站课程',
    'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/qcloud.png',
    'msg': 'peter - 2days ago',
    'episode': [
      'course0 - episode0 - 00000',
      'course0 - episode1 - 00000',
      'course0 - episode2 - 00000',
      'course0 - episode3 - 00000'
    ]
  },
  {
    'id': '1',
    'title': 'Meteor-React 小鸟课程',
    'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/qcloud.png',
    'msg': 'peter - 12days ago',
    'episode': [
      'course1 - episode0 - 111111',
      'course1 - episode1 - 111111',
      'course1 - episode2 - 111111',
      'course1 - episode3 - 111111'
    ]
  },
  {
    'id': '2',
    'title': 'Happypeter 的摩登 JS 王国',
    'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/qcloud.png',
    'msg': 'peter - 22days ago',
    'episode': [
      'course2 - episode0 - 233333',
      'course2 - episode1 - 233333',
      'course2 - episode2 - 233333',
      'course2 - episode3 - 233333'
    ]
  },
  {
    'id': '3',
    'title': 'Webpack-React 鼹鼠',
    'post': 'http://o86bpj665.bkt.clouddn.com/posters/webpack-react-mole.png',
    'msg': 'peter - 23days ago',
    'episode': [
      'course2 - episode0 - 233333',
      'course2 - episode1 - 266663',
      'course2 - episode2 - 233333',
      'course2 - episode3 - 233333'
    ]
  },
  {
    'id': '4',
    'post': 'http://o86bpj665.bkt.clouddn.com/posters/meteor-express-ajax.png',
    'title': 'Meteor-Express Ajax 方案',
    'episode': [
      'course2 - episode0 - 233333',
      'course2 - episode1 - 266663',
      'course2 - episode2 - 233333',
      'course2 - episode3 - 233333'
    ]
  },
  {
    'id': '5',
    'post': 'http://o86bpj665.bkt.clouddn.com/posters/ride-cli-monster.png',
    'title': '驾驭命令行怪兽',
    'episode': [
      'course2 - episode0 - 233333',
      'course2 - episode1 - 266663',
      'course2 - episode2 - 233333',
      'course2 - episode3 - 233333'
    ]
  }
]

export default function coursesReducer (state = courses, action) {
  return state
}
