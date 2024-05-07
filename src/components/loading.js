import { View, ActivityIndicator } from 'react-native';
import React from 'react';

export default function Loading(props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator {...props} />
    </View>
  );
}
