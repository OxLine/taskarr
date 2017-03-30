import React, { Component } from 'react';

class AddTaskPreview extends Component {
  renderTask(task) {
    return (
      <span>
        { task.split('\n').map((task) => (<p key={Math.random()}>{task}</p>))}
      </span>
    );
  }

  renderTasks(tasks) {
    return (
      <span>
        { tasks.map((task) => (<div key={Math.random()} className="preview-task card"><div className="card-content">{this.renderTask(task)}</div></div>))}
      </span>
    );
  }

  render() {
    
    var tasks = this.props.text.split('\n\n');
    tasks = tasks.filter((task) => task.length > 0);

    return (
      <div className="card preview-tasks">
        <div className="container">
          { this.props.text.length > 0 && this.renderTasks(tasks) || <div className="empty-preview-tasks">{'Preview tasks'}</div>}
        </div>
      </div>
    );
  }
}

export default AddTaskPreview; 
