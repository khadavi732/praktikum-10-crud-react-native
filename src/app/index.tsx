import { useEffect, useState } from "react";
import { Alert, Button, FlatList, Text, TextInput, View } from "react-native";

import { migrate } from "../db/database";
import * as notes from "../services/noteService";

export default function Home() {
  const [list, setList] = useState<notes.Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Memuat data dari database
  const load = () => {
    setList(notes.getAll());
  };

  // Membuat tabel dan mengambil data pertama kali
  useEffect(() => {
    migrate();
    load();
  }, []);

  // Menyimpan catatan
  const save = () => {
    if (title.trim().length < 3) {
      Alert.alert("Validasi", "Judul minimal 3 karakter");
      return;
    }

    if (editId !== null) {
      notes.update(editId, title.trim(), content);
    } else {
      notes.create(title.trim(), content);
    }

    setTitle("");
    setContent("");
    setEditId(null);

    load();
  };

  // Memilih catatan untuk diedit
  const edit = (item: notes.Note) => {
    setEditId(item.id);
    setTitle(item.title);
    setContent(item.content ?? "");
  };

  // Menghapus catatan
  const remove = (id: number) => {
    Alert.alert(
      "Konfirmasi",
      "Apakah kamu yakin ingin menghapus catatan ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            notes.remove(id);
            load();
          },
        },
      ],
    );
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        paddingTop: 56,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Catatan Kuliah
      </Text>

      <TextInput
        placeholder="Judul"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          padding: 8,
          marginBottom: 8,
        }}
      />

      <TextInput
        placeholder="Isi catatan"
        value={content}
        onChangeText={setContent}
        multiline
        style={{
          borderWidth: 1,
          padding: 8,
          marginBottom: 8,
          minHeight: 80,
          textAlignVertical: "top",
        }}
      />

      <Button
        title={editId !== null ? "Simpan Perubahan" : "Tambah"}
        onPress={save}
      />

      {editId !== null && (
        <View style={{ marginTop: 8 }}>
          <Button
            title="Batal Edit"
            color="gray"
            onPress={() => {
              setTitle("");
              setContent("");
              setEditId(null);
            }}
          />
        </View>
      )}

      <FlatList
        style={{ marginTop: 16 }}
        data={list}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <Text style={{ marginTop: 20, color: "gray" }}>
            Belum ada catatan.
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.title}
            </Text>

            <Text style={{ marginVertical: 6 }}>{item.content}</Text>

            <View
              style={{
                flexDirection: "row",
                gap: 8,
              }}
            >
              <Button title="Edit" onPress={() => edit(item)} />

              <Button
                title="Hapus"
                color="red"
                onPress={() => remove(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}
