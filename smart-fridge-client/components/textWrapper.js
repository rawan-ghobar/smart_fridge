import React from 'react';
import { Text } from 'react-native';
const AppText = ({ style, children, ...props }) => {
  return (
    <Text style={[{ fontFamily: 'Outfit-Regular' }, style]} {...props}>
      {children}
    </Text>
  );
};
export default AppText;
