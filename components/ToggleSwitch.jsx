import * as React from "react";
import { Switch } from "@rneui/themed";
import { useThemeStore } from "../store/map/useThemeStore";
import { Ionicons } from "@expo/vector-icons";
const ToggleSwitch = () => {
  const setMapTheme = useThemeStore((state) => state.setTheme);
  const isDark = useThemeStore((state) => state.isDarkTheme);
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);

  const onToggleSwitch = () => setMapTheme();
  return (
    <Switch value={isDark} onValueChange={onToggleSwitch}>
      <Ionicons
        name={isDark ? "sunny-outline" : "moon-outline"}
        size={24}
        color="white"
      />
    </Switch>
  );
};

export default ToggleSwitch;
