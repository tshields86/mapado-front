import axios from 'axios';
require('../config/env.js');

const mapadoURL = 'https://mapado-api.herokuapp.com/';

module.exports = {
  getTasks: function(){
    return axios.get(`${mapadoURL}api/tasks`);
  },
  getTask: function(task){
    return axios.get(`${mapadoURL}api/task/${task}`);
  },
  addTask: function(task){
    return axios.post(`${mapadoURL}api/task`, task);
  },
  deleteTask: function(task){
    return axios.delete(`${mapadoURL}api/task/${task}`);
  },
  updateTask: function(task){
    return axios.put(`${mapadoURL}api/task`, task);
  },
  // getTasks: function(){
  //   // all of YOUR route urls need to be updated for production
  //   return axios.get('http://localhost:3000/api/tasks');
  // },
  // getTask: function(task){
  //   return axios.get('http://localhost:3000/api/task/' + task)
  // },
  // addTask: function(task){
  //   return axios.post('http://localhost:3000/api/task', task);
  // },
  // deleteTask: function(task){
  //   return axios.delete('http://localhost:3000/api/task/' + task);
  // },
  // updateTask: function(task){
  //   return axios.put('http://localhost:3000/api/task', task);
  // },
  geoCode: function(address){
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + process.env.GAPI_KEY);
  }
}
