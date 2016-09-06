import axios from 'axios';

module.exports = {
  getTasks: function(){
    // all of YOUR route urls need to be updated for production
    return axios.get('http://localhost:3000/api/tasks');
  },
  getTask: function(task){
    return axios.get('http://localhost:3000/api/task/' + task)
  },
  addTask: function(task){
    return axios.post('http://localhost:3000/api/task', task);
  },
  deleteTask: function(task){
    return axios.delete('http://localhost:3000/api/task/' + task);
  },
  updateTask: function(task){
    return axios.put('http://localhost:3000/api/task', task);
  }
}
