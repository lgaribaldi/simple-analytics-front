import React, { Component } from 'react'
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment'

const itemStyle = {
  'width': '33%'
};

export default class Project extends Component {

  render() {
    const {project, listkey, selectProject} = this.props;
    const {name, lastUpdate, _id } = project;
    
    return (
      <ListItem
        key={listkey}
        divider>         
        <ListItemText style={itemStyle} primary={name} />
        <ListItemText style={itemStyle} primary={_id} />
        <ListItemText style={itemStyle} primary={moment(lastUpdate).calendar()} />                 
        <IconButton aria-label="Info" onClick={selectProject(project)}
          style={project.events && project.events.length ? {} : {"visibility":"hidden"}}>
        <InfoIcon />
        </IconButton>        
      </ListItem>      
    )
  }
}

Project.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  listkey: PropTypes.number.isRequired,
  selectProject: PropTypes.func.isRequired
}
