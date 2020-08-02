import {
  Checkbox,
  Box,
  Typography,
  Button,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const initialList = [
  {
    thing: "Write React",
    finish: false,
  },
];

const ToDoItem = ({ index, item, onDelete, onComplete }) => {
  return (
    <div>
      <Box display="flex" alignItems="center">
        {item.finish ?
          <del><Typography variant="h5">
            {item.thing}
          </Typography></del>
          :
          <Typography variant="h5">
            {item.thing}
          </Typography>
        }
        <Checkbox
          checked={item.finish}
          color="primary"
          onChange={() => onComplete(item)
          }
        />
        <IconButton>
          <DeleteIcon
            onClick={() => onDelete(item)} />
        </IconButton>
      </Box>
    </div>
  )
}

const useAppStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 10,
    width: 100,
    padding: '20px 10px 20px 10px',
    marginLeft: "5px",
    marginright: "0px",
    marginTop: "15px",
    marginBottom: "15px",
  },
}));

function App() {

  const classes = useAppStyles();

  const [value, setValue] = useState('');
  const [list, setList] = useState(initialList);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    if (value) {
      setList(list.concat(
        {
          thing: value,
          finish: false,
        }
      ));
    }

    setValue('');

    event.preventDefault();
  };

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <ToDoItem
            key={index}
            item={item}
            onDelete={(item) => {
              const newList = list.filter(e => e !== item);
              setList(newList);
            }}
            onComplete={(item) => {
              const newList = [...list];
              const targeto = newList.find(objecttofind => objecttofind === item);
              targeto.finish = !(targeto.finish)
              setList(newList)
            }} />))}
      </ul>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField id="standard-basic" label="To do item" value={value} onChange={handleChange} />
        <Button className={classes.button} size="small" type="submit">
          Add item
        </Button>
      </form>
    </div>
  );
}

export default App;