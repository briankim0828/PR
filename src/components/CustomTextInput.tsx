import React, { useRef, useCallback } from 'react';
import { TextInput, StyleSheet, View, findNodeHandle, UIManager } from 'react-native';
import { parseFontSize } from '../../helper/fontsize';

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  color?: string;
  fontSize?: string | number;
  placeholder?: string;
  placeholderTextColor?: string;
  style?: any;
  multiline?: boolean;
  numberOfLines?: number;
  onFocusScroll?: (y: number, height: number) => void;
}

const CustomTextInput = ({
  value,
  onChangeText,
  color = 'white',
  fontSize = 16,
  placeholder,
  placeholderTextColor,
  style,
  multiline = false,
  numberOfLines = 1,
  onFocusScroll,
  ...rest
}: CustomTextInputProps) => {
  const viewRef = useRef<View>(null);

  const handleFocus = useCallback(() => {
    if (!onFocusScroll) return;
    
    // Use a delay to ensure the keyboard is shown and layout is updated
    setTimeout(() => {
      if (viewRef.current) {
        try {
          const handle = findNodeHandle(viewRef.current);
          if (handle) {
            UIManager.measureInWindow(handle, (x, y, width, height) => {
              onFocusScroll(y, height);
            });
          }
        } catch (error) {
          // Silently handle error
        }
      }
    }, 150);
  }, [onFocusScroll]);

  const calculatedFontSize = parseFontSize(fontSize);

  return (
    <View ref={viewRef} style={[styles.container, style]} collapsable={false}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          {
            color: color,
            fontSize: calculatedFontSize,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onFocus={handleFocus}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#4A4A4A',
    borderRadius: 4,
    padding: 8,
    backgroundColor: 'transparent',
  },
  input: {
    padding: 0,
  },
});

export default CustomTextInput; 