import React from 'react';

import Welcome from './Welcome/Welcome';
import TaskDescription from './TaskDescription/TaskDescription';
import TaskLocationAndTime from './TaskLocationAndTime/TaskLocationAndTime';
import TaskBudget from './TaskBudget/TaskBudget';

class PostTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreenIndex: 0,
      jobTitle: "",
      jobDetails: "",
      jobTitleLength: 10, 
      jobDetailsLength: 25,
      startDate: null,
      taskBudget: "0",
    }

    this.handleScreenSwitch = this.handleScreenSwitch.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.onJobTitle = this.onJobTitle.bind(this);
    this.onJobDetails = this.onJobDetails.bind(this);
    this.handleJobTitle = this.handleJobTitle.bind(this);
    this.handleJobDetails = this.handleJobDetails.bind(this);
    this.handleTaskDescriptionNextClick = this.handleTaskDescriptionNextClick.bind(this);
    this.handleTaskLocationAndTimeNextClick = this.handleTaskLocationAndTimeNextClick.bind(this);
    this.handleDateValue = this.handleDateValue.bind(this);
    this.onBudget = this.onBudget.bind(this);
  }

  onJobTitle(value) {
    this.setState(
      { jobTitle: value },
      this.handleJobTitle
      );
  }

  onJobDetails(value) {
    this.setState(
      { jobDetails: value },
      this.handleJobDetails
      );
  }

  onBudget(value) {
    this.setState({ taskBudget: value });
  }

  handleJobTitle() {
    this.setState({ jobTitleLength: this.state.jobTitle.length });
  }

  handleJobDetails() {
    this.setState({ jobDetailsLength: this.state.jobDetails.length });
  }

  handleDateValue(date) {
    this.setState({ startDate: date });
  }

  handleNextClick() {
    this.setState(() => ({
      currentScreenIndex: this.state.currentScreenIndex + 1,
    })
  )}

  handleBackClick() {
    this.setState((prevState) => ({
      currentScreenIndex: prevState.currentScreenIndex - 1,
    })
  )}

  handleTaskDescriptionNextClick() {
    this.handleJobTitle();
    this.handleJobDetails();
   
    if (this.state.jobTitleLength > 10 && this.state.jobDetailsLength > 25) {
      this.handleNextClick();
    }
  }

  handleTaskLocationAndTimeNextClick() {
    const { startDate } = this.state;

    if (!startDate) {
      return;
    }
    this.handleNextClick();
  }

  handleScreenSwitch (screenIndex) {
    switch (screenIndex) {
      default: return(
        <div>
          default
        </div>
      );
      case (0): 
        return (
          <Welcome handleNextClick={this.handleNextClick} />
        );
        
      case (1):
        return ( 
          <TaskDescription
              jobTitleLength={this.state.jobTitleLength}
              jobDetailsLength={this.state.jobDetailsLength}
              onJobTitle={this.onJobTitle}
              onJobDetails={this.onJobDetails}
              handleJobTitle={this.handleJobTitle}
              handleJobDetails={this.handleJobDetails}
              handleNextClick={this.handleTaskDescriptionNextClick}
              handleBackClick={this.handleBackClick}
          />
        );

      case (2):
        return ( 
          <TaskLocationAndTime 
              startDate={this.state.startDate}
              handleDateValue={this.handleDateValue}
              handleNextClick={this.handleTaskLocationAndTimeNextClick}
              handleBackClick={this.handleBackClick}
          />
        );

      case (3):
        return (
          <TaskBudget
            taskBudget={this.state.taskBudget}
            handleBackClick={this.handleBackClick}
            onBudget={this.onBudget}
          /> 
        );
        
    }
  }

  render() {
    const { currentScreenIndex } = this.state;
    return (
      <React.Fragment>
      {
        this.handleScreenSwitch(currentScreenIndex)
      }
      </React.Fragment>
    )
  }
}

export default PostTaskForm;