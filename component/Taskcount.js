import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const TaskCount = () => {
  const tasks = useSelector(state => state.tasks.tasks);

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>Total Tasks: {tasks.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskCount;
