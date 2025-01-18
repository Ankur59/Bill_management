import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      {/* Default screen */}
      <Stack.Screen
        name="index"
        options={{
          title: "Bill management",
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
