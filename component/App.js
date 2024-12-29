import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTask,
  toggleCompletion,
  deleteTask,
  setEditingTaskId,
  updateTask,
} from './redux/tasksSlice';
import TaskForm from './Taskform';
import TaskList from './Tasklist';
import TaskCount from './Taskcount';

const App = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const editingTaskId = useSelector(state => state.tasks.editingTaskId); // (Get editing task ID from Redux)
  const dispatch = useDispatch();

  const [taskText, setTaskText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('Medium');

  useEffect(() => {
    if (editingTaskId) {
      const taskToEdit = tasks.find(task => task.id === editingTaskId);
      if (taskToEdit) {
        setTaskText(taskToEdit.text);
        setSelectedPriority(taskToEdit.priority);
      }
    }
  }, [editingTaskId, tasks]);

  const onAddTask = () => {
    if (taskText.trim()) {
      if (editingTaskId) {
        dispatch(
          updateTask({
            id: editingTaskId,
            text: taskText,
            priority: selectedPriority,
          }),
        );
      } else {
        dispatch(
          addTask({
            id: Date.now().toString(),
            text: taskText,
            completed: false,
            priority: selectedPriority,
          }),
        );
      }
      setTaskText('');
      setSelectedPriority('Medium');
      dispatch(setEditingTaskId(null));
    } else {
      alert('Task cannot be empty');
    }
  };

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TaskForm
        taskText={taskText}
        setTaskText={setTaskText}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        onAddTask={onAddTask}
        editingTaskId={editingTaskId}
      />
      <TaskCount />
      <TaskList
        tasks={tasks}
        onToggleCompletion={onToggleCompletion}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f0f0f0'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
