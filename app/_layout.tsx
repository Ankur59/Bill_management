import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      {/* Default screen */}
      <Stack.Screen
        name="index"
        options={{
          title: "Bill management",
        }}
      />
    </Stack>
  );
};

export default Layout;
