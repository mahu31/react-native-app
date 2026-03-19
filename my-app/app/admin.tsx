import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useTasks } from "./store";

export default function Admin() {
    const { tasks, addTask, deleteTask, updateTask } = useTasks();
    const [text, setText] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>

            <Text style={{ fontSize: 28, fontWeight: "600", marginBottom: 20 }}>
                Admin Panel
            </Text>

            <TextInput
                placeholder="Add new task..."
                value={text}
                onChangeText={setText}
                style={{
                    backgroundColor: "#fff",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10,
                }}
            />

            <TouchableOpacity
                onPress={() => {
                    if (!text) return;
                    addTask(text);
                    setText("");
                }}
                style={{
                    backgroundColor: "#007AFF",
                    padding: 15,
                    borderRadius: 10,
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                    Add Task
                </Text>
            </TouchableOpacity>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                // renderItem={({ item }) => (
                //     <View
                //         style={{
                //             backgroundColor: "#fff",
                //             padding: 15,
                //             borderRadius: 12,
                //             marginBottom: 10,
                //             flexDirection: "row",
                //             justifyContent: "space-between",
                //             alignItems: "center",
                //         }}
                //     >
                //         <Text>{item.text}</Text>
                //
                //         <TouchableOpacity
                //             onPress={() => deleteTask(item.id)}
                //             style={{
                //                 backgroundColor: "#ff3b30",
                //                 paddingVertical: 5,
                //                 paddingHorizontal: 10,
                //                 borderRadius: 6,
                //             }}
                //         >
                //             <Text style={{ color: "#fff" }}>Delete</Text>
                //         </TouchableOpacity>
                //     </View>
                // )}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "#fff",
                            padding: 15,
                            borderRadius: 12,
                            marginBottom: 10,
                        }}
                    >
                        {editingId === item.id ? (
                            <>
                                <TextInput
                                    value={editingText}
                                    onChangeText={setEditingText}
                                    style={{
                                        borderWidth: 1,
                                        padding: 10,
                                        marginBottom: 10,
                                    }}
                                />

                                <TouchableOpacity
                                    onPress={() => {
                                        updateTask(item.id, editingText);
                                        setEditingId(null);
                                    }}
                                    style={{
                                        backgroundColor: "#34C759",
                                        padding: 10,
                                        borderRadius: 8,
                                        marginBottom: 5,
                                    }}
                                >
                                    <Text style={{ color: "#fff" }}>Save</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={{ fontSize: 16 }}>{item.text}</Text>

                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setEditingId(item.id);
                                            setEditingText(item.text);
                                        }}
                                        style={{
                                            backgroundColor: "#007AFF",
                                            padding: 8,
                                            borderRadius: 6,
                                            marginRight: 10,
                                        }}
                                    >
                                        <Text style={{ color: "#fff" }}>Edit</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => deleteTask(item.id)}
                                        style={{
                                            backgroundColor: "#ff3b30",
                                            padding: 8,
                                            borderRadius: 6,
                                        }}
                                    >
                                        <Text style={{ color: "#fff" }}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                )}
            />
        </View>
    );
}
