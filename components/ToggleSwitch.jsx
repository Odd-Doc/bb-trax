// import * as React from "react";
// import { Switch } from "@rneui/themed";
// import { useThemeStore } from "../store/map/useThemeStore";
// import { Ionicons } from "@expo/vector-icons";
// import { View, Text } from "react-native";
// const ToggleSwitch = () => {
//   const setMapTheme = useThemeStore((state) => state.setTheme);
//   const isDark = useThemeStore((state) => state.isDarkTheme);
//   const [isSwitchOn, setIsSwitchOn] = React.useState(false);

//   const onToggleSwitch = () => {
//     setMapTheme();
//     setIsSwitchOn(!isSwitchOn);
//   };
//   return (
//     <Switch
//       style={{
//         justifyContent: "center",
//       }}
//       value={isSwitchOn}
//       onValueChange={onToggleSwitch}
//       color={isSwitchOn ? "#000000" : ""}
//       ios_backgroundColor={isSwitchOn ? "" : "#a7a7a7"}
//     >
//       <View
//         style={[
//           { width: 22, height: 22, marginLeft: 5 },
//           { transform: [{ translateX: isSwitchOn ? 21 : 0 }] },
//         ]}
//         pointerEvents="none"
//       >
//         <Ionicons
//           name={isDark ? "moon-outline" : "sunny-outline"}
//           size={21}
//           color="black"
//         />
//       </View>
//     </Switch>
//   );
// };

// export default ToggleSwitch;
