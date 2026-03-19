import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useTasks } from "./store";

export default function User() {
    const { tasks, toggleTask } = useTasks();

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>

            <Text style={{ fontSize: 28, fontWeight: "600", marginBottom: 20 }}>
                My Tasks ({tasks.length})
            </Text>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 50, color: "#777" }}>
                        There are no tasks right now
                    </Text>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => toggleTask(item.id)}
                        style={{
                            backgroundColor: "#fff",
                            padding: 15,
                            borderRadius: 12,
                            marginBottom: 10,
                            shadowColor: "#000",
                            shadowOpacity: 0.05,
                            shadowRadius: 5,
                            elevation: 2,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                textDecorationLine: item.done ? "line-through" : "none",
                                color: item.done ? "#999" : "#000",
                            }}
                        >
                            {item.text}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
