import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
  'width': '30%'
};
const btnStyle = {
  'marginLeft': '20px'
}

class ProjectForm extends Component {

  state = {
    name: ''
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  buttonClick = () => {
    const { newProject } = this.props;
    newProject(this.state.name);
    this.setState({'name': ''});
  };

  render() {
    
    return (
      <div>
        <TextField
          id="name"
          label="Project Name"
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          style={styles}
        />
        <Button variant="contained"
          onClick={this.buttonClick}
          disabled={this.state.name === ''}
          style={btnStyle}>
          Add Project
        </Button>
      </div>
    )
  }
}

ProjectForm.propTypes = {
  newProject: PropTypes.func.isRequired
}

export default ProjectForm;