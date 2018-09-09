import React, { Component } from 'react';
import './App.css';
import feathers from "@feathersjs/client";
import Button from '@material-ui/core/Button';
import ProjectsList from './ProjectsList.js';
import EventsList from './EventsList.js';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

const btnStyle = {
  "margin-top": "20px"
};

const feathersapp = feathers();
// Connect to a different URL
const restClient = feathers.rest('http://localhost:3030')

// Configure an AJAX library with that client 
feathersapp.configure(restClient.fetch(window.fetch))
  .configure(feathers.authentication( 
    { cookie: 'feathers-jwt' } ));  

class App extends Component {
  
  state = { 
    user: {},
    projects: [],
    feathersapp: feathersapp
  };  

  constructor(){
    super();
    feathersapp.authenticate()
    .then(response => {  
      //login successful    
      this.setState({user: {
        accessToken : response.accessToken,
        userId: response.userId
      }});

    })
    .catch(error => {      
      console.log(error);
    });
  }

  handleLogin =  () => {
    window.location.href = "http://localhost:3030/auth/github";
  }  

  updateProjects = projects => {
    this.setState({projects: projects})
  }

  selectProject =  project => () => {
    this.setState({selectedProject: project})
  }

  render() {

    const { projects, user, feathersapp, selectedProject } = this.state;

    console.log(selectedProject)
    return (
      <div className="App">
        <header className="App-header">
          <Typography style={{"color":"#ccc"}} variant="display3" gutterBottom>
            Simple Analytics
          </Typography>          
        </header>
        { user.accessToken ?
          (
            selectedProject && selectedProject.events ?
            <EventsList
              project={selectedProject}              
              selectProject={this.selectProject}
              ></EventsList>
            :
            <ProjectsList
              projects={projects}
              user={user}
              feathersapp={feathersapp}
              updateProjects={this.updateProjects}
              selectProject={this.selectProject}
              ></ProjectsList>
          )
          :
          <Button variant="contained"
            onClick={this.handleLogin}
            style={btnStyle}>
            Log in with Github
          </Button>
        }
      </div>
    );
  }
}

export default App;
