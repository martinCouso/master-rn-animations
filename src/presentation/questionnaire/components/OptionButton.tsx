import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

interface Props {
  onPress: () => void;
  text: string;
}
const OptionButton: React.FC<Props> = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default OptionButton;
