import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
      <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
      >
        <Text style={{ fontSize: 28, marginBottom: 20 }}>
          University App
        </Text>

        <Button
            title="Login as Admin"
            onPress={() => router.push("/admin")}
        />

        <View style={{ height: 20 }} />

        <Button
            title="Login as User"
            onPress={() => router.push("/user")}
        />
      </View>
  );
}
