var mongoose = require('mongoose');

module.exports = mongoose.model('rfc',{
  name: {
    type: String,
    default: ''
  },
  email:{
    type: String,
    default: ''
  },
  subject: {
      type: String,
      default: ''
  },
  descriptions: {
    type: String,
    default: ''
  },
  start_date: {
    type: String,
    default: Date.now
  },
  end_date: {
    type: String,
    default: Date.now
  },
  impact: {
    type: String,
    default: 'Low'
  },
  benefits: {
    type: String,
    default: 'n/a'
  },
  risks: {
    type: String,
    default: 'n/a'
  },
  result: {
    type: String,
    default: 'n/a'
  },
  implemented:{
    type: String,
    default: 'n/a'
  },
  duration: {
    type: String,
    default: 'n/a'
  },
  categories: String,
  host_name: {
    type: String,
    default: 'n/a'
  },
  environment: {
    type: String,
    default: 'n/a'
  },
  affected_network: {
    type: String,
    default: 'n/a'
  },
  hard_soft: {
    type: String,
    default: 'n/a'
  },
  detail_plan: {
    type: String,
    default: 'n/a'
  },
  back_out_plan: {
    type: String,
    default: 'n/a'
  },
  process: {
    type: String,
    default: 'n/a'
  },
  outage: {
    type: String,
    default: 'n/a'
  },
  test: {
    type: String,
    default: 'n/a'
  },
  responsible_teams: String,
  notify_teams: String,
  SLA: {
    type: String,
    default: 'n/a'
  },
  event: {
    type: String,
    default: 'n/a'
  },
  ticket_num: {
    type: Number,
    default: 0
  },
  creation_date{
    type: Date,
    default: Date.now
  },
  status{
    type: String,
    default: 'pending'
  }
});
