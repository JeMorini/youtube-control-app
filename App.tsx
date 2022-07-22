import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Slider from "@react-native-community/slider";

export default function App() {
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0);
  const [url, setUrl] = useState("");
  initializeApp({
    //
  });

  const db = getFirestore();

  useEffect(() => {
    try {
      onSnapshot(doc(db, "youtube", "params"), (doc: any) => {
        setPlay(doc.data().playng);
        setVolume(doc.data().volume);
      });
    } catch (err) {
      alert("err");
    }
  }, [db]);

  async function handlePlayPause() {
    await updateDoc(doc(db, "youtube", "params"), {
      playng: play,
    });
    setPlay((prevState) => !prevState);
  }

  async function handleChangeVolume(vol: any) {
    await updateDoc(doc(db, "youtube", "params"), {
      volume: Number(vol.toFixed(2)),
    });
  }

  async function handleChangeTime(vol: any) {
    await updateDoc(doc(db, "youtube", "seek"), {
      currentSeek: vol,
    });
  }

  async function handleChangeUrl() {
    await updateDoc(doc(db, "youtube", "params"), {
      url: url,
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ backgroundColor: "red", width: 200 }}
        onChangeText={(url) => setUrl(url)}
      />
      <TouchableOpacity
        onPress={handleChangeUrl}
        style={{ width: 200, height: 100, backgroundColor: "red" }}
      >
        <Text>URL</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePlayPause}
        style={{ width: 200, height: 100, backgroundColor: "red" }}
      >
        <Text>PLAY/PAUSE</Text>
      </TouchableOpacity>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={(vol) => handleChangeVolume(vol)}
      />
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={(vol) => handleChangeTime(vol)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
