import { Link } from "expo-router";
import React, { Children } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface PropTypes {
  href: string;
  children: React.JSX.Element;
}

const LinkPressable = ({ href, children }: PropTypes): React.JSX.Element => {
  return (
    <View style={styles.link}>
      <Link href={href}>{children}</Link>
    </View>
  );
};
const styles = StyleSheet.create({
  link: {
    alignSelf: "center",
  },
});

export default LinkPressable;
