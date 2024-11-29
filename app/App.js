import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskItem from './Taskitem';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState('Medium');

  const addTask = () => {
    if (taskText.trim()) {
      if (editingTaskId !== null) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editingTaskId
              ? { ...task, text: taskText, priority: selectedPriority }
              : task
          )
        );
        setEditingTaskId(null);
      } else {
        setTasks([
          ...tasks,
          { id: Date.now().toString(), text: taskText, completed: false, priority: selectedPriority },
        ]);
      }
      setTaskText('');
      setSelectedPriority('Medium');
    } else {
      alert('Task cannot be empty');
    }
  };

  const toggleCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setTaskText(taskToEdit.text);
      setSelectedPriority(taskToEdit.priority);
      setEditingTaskId(id);
    }
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TaskForm
        taskText={taskText}
        setTaskText={setTaskText}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        onAddTask={addTask}
        editingTaskId={editingTaskId}
      />
      <TaskList
        tasks={sortedTasks}
        onToggleCompletion={toggleCompletion}
        onEditTask={editTask}
        onDeleteTask={deleteTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
});

export default App;

