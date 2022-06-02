import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

export default function TaskFormDialog({ 
  dialogTitle,
  taskTitleDefaultValue,
  handleTaskTitle,
  taskDescDefaultValue,
  handleTaskDesc, 
  isTaskComplete,
  handleIsTaskComplete, 
  isOpen, 
  handleClose, 
  handleSubmit,
  handleDelete,
}) {

  const handleSubmitLabelChange = () => {
    if (dialogTitle === "Edit Task") {
      return "Update Task"
    }
    
    if (dialogTitle === "Add Task") {
      return "Add Task"
    }
  };

  const handleDeleteButtonOnEdit = () => {
    if (dialogTitle === "Edit Task") {
      return (<Button onClick={handleDelete}>Delete Task</Button>);
    } else {
      return null;
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField 
            variant="outlined"
            onChange={handleTaskTitle}
            defaultValue={taskTitleDefaultValue}
            placeholder="Title"
          />
          <TextField
            multiline
            variant="outlined"
            onChange={handleTaskDesc}
            defaultValue={taskDescDefaultValue}
            placeholder="Description"
          />
          <label>
            <small>Completed</small>
            <Checkbox 
              onChange={handleIsTaskComplete}
              checked={isTaskComplete}
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {handleDeleteButtonOnEdit()}
          <Button onClick={handleSubmit}>{handleSubmitLabelChange()}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}