import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ProjectForm from './ProjectForm.js';
import Project from './Project.js';

const styles = {
    'width': '60%',
    'backgroundColor': 'white',
    'position': 'relative',
    'overflow': 'auto',
    'paddingLeft': '20%'
  };

class ProjectsList extends Component {

  newProject = name => {
    const { feathersapp } = this.props;
    feathersapp
      .service('projects')
      .create({
        name: name
      });
  }  

  loadProjects = () => {
    const { feathersapp, user, updateProjects } = this.props;
    feathersapp
      .service('projects')
      .find({
        userId: user.userId
      })
      .then(response => updateProjects(response.data));
  }

  componentDidMount() {
    this.loadProjects();
    setInterval(this.loadProjects(), 10000);
  }

  render() {
    const { projects, selectProject } = this.props;

    return (
      <div>
        <List style={styles}>
          <ListItem
            key={0}
            divider>         
            <ListItemText style={ { 'width' : '25%' } } primary='Project Name'/>
            <ListItemText style={ { 'width' : '25%' } } primary='ID'/>
            <ListItemText style={ { 'width' : '30%' } } primary='Last Update'/>            
            
          </ListItem>
          {
            projects.map((mapProject, i) =>{
              return (<Project 
                key={i}
                listkey={i}
                project={mapProject}
                selectProject={selectProject}>
              </Project>)
            })
          }
          <ProjectForm
            newProject={this.newProject}>
          </ProjectForm>
        </List>
      </div>
    )
  }
}

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  feathersapp: PropTypes.object.isRequired,
  updateProjects: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired
}

export default ProjectsList;