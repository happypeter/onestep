
let courses = [
  {
    'id': '0',
    'title': 'Course0',
    'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/antd.png',
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
    'title': 'Course1',
    'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/aa-journey.png',
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
    'title': 'Course2',
    'post': 'http://o86bpj665.bkt.clouddn.com/posters/o-o-js.png',
    'msg': 'peter - 22days ago',
    'episode': [
      'course2 - episode0 - 233333',
      'course2 - episode1 - 233333',
      'course2 - episode2 - 233333',
      'course2 - episode3 - 233333'
    ]
  }
]

export default function coursesReducer(state=courses, action) {
  return state
}
