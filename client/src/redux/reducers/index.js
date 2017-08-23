
let courses = [
  {
    'id': '0',
    'title': 'Course0',
    'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/redux-hello-v2.png',
    'msg': 'peter - 2days ago'
  },
  {
    'id': '1',
    'title': 'Course1',
    'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/aa-journey.png',
    'msg': 'peter - 12days ago'
  },
  {
    'id': '2',
    'title': 'Course2',
    'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/redux-hello-v2.png',
    'msg': 'peter - 22days ago'
  }
]

export default function rootReducer(state=courses, action) {
  return state
}
