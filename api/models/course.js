const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CourseSchema = new Schema(
  {
    key: Number,
    courseName: String,
    vlink: String,
    name: String,
    price: Number,
    intro: String,
    writing_to_who: String,
    learning_goal: String,
    service: [String],
    content: [
      {
        header: String,
        section: [
          {
            title: String,
            link: String,
          },
        ],
      },
    ],
    publishedOn: String,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Course', CourseSchema)
