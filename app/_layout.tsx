import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack >
      {/* Default screen */}
      <Stack.Screen
        name="index"
        options={{
          title: "Bill management",
          headerShown:false
        }}
      />
      <Stack.Screen
        name="form"
        options={{
          title: "form",
        }}
      />
    </Stack>
  );
};

export default Layout;
