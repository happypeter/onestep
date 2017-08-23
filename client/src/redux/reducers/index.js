
let courses = [
  {
    'id': '0',
    'title': 'Course0',
    'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/redux-hello-v2.png',
    'msg': 'peter - 2days ago',
    'chapter': [
      'course0 - chapter0 - 00000',
      'course0 - chapter1 - 00000',
      'course0 - chapter2 - 00000',
      'course0 - chapter3 - 00000'
    ]
  },
  {
    'id': '1',
    'title': 'Course1',
    'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/aa-journey.png',
    'msg': 'peter - 12days ago',
    'chapter': [
      'course1 - chapter0 - 111111',
      'course1 - chapter1 - 111111',
      'course1 - chapter2 - 111111',
      'course1 - chapter3 - 111111'
    ]
  },
  {
    'id': '2',
    'title': 'Course2',
    'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/redux-hello-v2.png',
    'msg': 'peter - 22days ago',
    'chapter': [
      'course2 - chapter0 - 233333',
      'course2 - chapter1 - 233333',
      'course2 - chapter2 - 233333',
      'course2 - chapter3 - 233333'
    ]
  }
]

export default function rootReducer(state=courses, action) {
  return state
}
