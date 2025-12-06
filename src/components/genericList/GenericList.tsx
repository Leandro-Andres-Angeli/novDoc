import { View, Text, FlatList, FlatListProps } from 'react-native';
import React from 'react';

interface GenericListProps<T> extends FlatListProps<T> {
  data: T[];
}
const GenericList = <T extends { id: string }>(props: GenericListProps<T>) => {
  return <FlatList {...props} keyExtractor={(item) => item.id}></FlatList>;
};

export default GenericList;
