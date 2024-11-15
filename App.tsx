/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Updated import

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState('Medium'); // Default priority

  const addTask = () => {
    if (taskText.trim()) {
      if (editingTaskId !== null) {
        // Edit existing task
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editingTaskId
              ? { ...task, text: taskText, priority: selectedPriority }
              : task
          )
        );
        setEditingTaskId(null);
      } else {
        // Add new task
        setTasks([
          ...tasks,
          { id: Date.now().toString(), text: taskText, completed: false, priority: selectedPriority },
        ]);
      }
      setTaskText('');
      setSelectedPriority('Medium'); // Reset to default priority
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

  const renderTask = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity
          style={styles.taskTextContainer}
          onPress={() => toggleCompletion(item.id)}
        >
          <Text
            style={[
              styles.taskText,
              item.completed && styles.taskCompleted,
            ]}
          >
            {item.text}
          </Text>
          <Text style={styles.priorityText}>Priority: {item.priority}</Text>
        </TouchableOpacity>
        <View style={styles.taskActions}>
          <Button title="Edit" onPress={() => editTask(item.id)} />
          <Button title="Delete" color="red" onPress={() => deleteTask(item.id)} />
        </View>
      </View>
    );
  };

  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={taskText}
        onChangeText={setTaskText}
      />
      <Picker
        selectedValue={selectedPriority}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedPriority(itemValue)}
      >
        <Picker.Item label="High" value="High" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="Low" value="Low" />
      </Picker>
      <Button title={editingTaskId ? "Update Task" : "Add Task"} onPress={addTask} />
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  picker: { height: 50, width: 150, marginBottom: 10 },
  taskContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  taskTextContainer: { flex: 1 },
  taskText: { fontSize: 18 },
  taskCompleted: { textDecorationLine: 'line-through', color: 'green' },
  priorityText: { fontSize: 14, color: '#888', marginTop: 5 },
  taskActions: { flexDirection: 'row', gap: 10 },
  list: { marginTop: 20 },
});

export default App;

