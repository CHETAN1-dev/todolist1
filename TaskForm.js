import React from 'react';
import { TextInput, Button, Picker, StyleSheet } from 'react-native';

const TaskForm = ({ taskText, setTaskText, selectedPriority, setSelectedPriority, onAddTask, editingTaskId }) => {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={taskText}
        onChangeText={setTaskText}
      />
      <Picker
        selectedValue={selectedPriority}
        style={styles.picker}
        onValueChange={setSelectedPriority}
      >
        <Picker.Item label="High" value="High" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="Low" value="Low" />
      </Picker>
      <Button title={editingTaskId ? "Update Task" : "Add Task"} onPress={onAddTask} />
    </>
  );
};

const styles = StyleSheet.create({
  input: { padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  picker: { height: 50, width: 150, marginBottom: 10 },
});

export default TaskForm;
