import React from 'react';
import { FlatList, View } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleCompletion, onEditTask, onDeleteTask }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          onToggleCompletion={onToggleCompletion}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      )}
      style={{ marginTop: 20 }}
    />
  );
};

export default TaskList;
