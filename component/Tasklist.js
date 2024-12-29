import React from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  toggleCompletion,
  deleteTask,
  setEditingTaskId,
} from './redux/tasksSlice';
import TaskItem from './Taskitem';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const onToggleCompletion = id => {
    dispatch(toggleCompletion(id));
  };

  const onEditTask = id => {
    dispatch(setEditingTaskId(id));
  };

  const onDeleteTask = id => {
    dispatch(deleteTask(id));
  };

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TaskItem
          task={item}
          onToggleCompletion={onToggleCompletion}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      )}
      style={{marginTop: 20}}
    />
  );
};

export default TaskList;
