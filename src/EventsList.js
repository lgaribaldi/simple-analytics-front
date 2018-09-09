import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import moment from 'moment'

const styles = {
    'width': '60%',
    'backgroundColor': 'white',
    'position': 'relative',
    'overflow': 'auto',
    'paddingLeft': '20%'
  };

class EventsList extends Component {

  render() {
    const { project, selectProject } = this.props;

    return (
      <div>
        <List style={styles}>
          <ListItem
            key={0}
            divider>         
            <ListItemText style={ { 'width' : '15%' } } primary='IP'/>
            <ListItemText style={ { 'width' : '40%' } } primary='DateTime'/>            
            <ListItemText style={ { 'width' : '55%' } } primary='Description'/>            
          </ListItem>
          {
            project.events.map((mapEvent, i) =>{
              return (
              <ListItem
                key={i + 1}>         
                <ListItemText style={ { 'width' : '15%' } } primary={mapEvent.ip}/>
                <ListItemText style={ { 'width' : '40%' } } primary={moment(mapEvent.dateTime).calendar()}/>            
                <ListItemText style={ { 'width' : '55%' } } primary={mapEvent.description}/>            
              </ListItem>)
            })
          }          
        </List>
        <IconButton aria-label="Back" onClick={selectProject(null)}>
          <ArrowBack />
        </IconButton>        
      </div>
    )
  }
}

EventsList.propTypes = {
  project: PropTypes.object.isRequired,  
  selectProject: PropTypes.func.isRequired
}

export default EventsList;