import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Slider from "@react-native-community/slider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Title,
  Input,
  ButtonPlayPause,
  ButtonUrl,
  TextUrl,
  ContainerButtonSpeed,
  ButtonSpeed,
  TextSpeed,
} from "./styles";

export default function Control() {
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0);
  const [seek, setSeek] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [url, setUrl] = useState("");
  initializeApp({});

  const db = getFirestore();

  useEffect(() => {
    try {
      onSnapshot(doc(db, "youtube", "params"), (doc: any) => {
        setPlay(doc.data().playng);
        setVolume(doc.data().volume);
        setVelocity(doc.data().velocity);
      });
    } catch (err) {
      alert("err");
    }
  }, []);

  useEffect(() => {
    try {
      onSnapshot(doc(db, "youtube", "seek"), (doc: any) => {
        setSeek(doc.data().currentSeek);
      });
    } catch (err) {
      alert("err");
    }
  }, []);

  async function handlePlayPause() {
    setPlay((prevState) => !prevState);
    await updateDoc(doc(db, "youtube", "params"), {
      playng: !play,
    });
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
    setUrl("");
    Keyboard.dismiss();
  }

  async function handleChangeVelocity(vol: any) {
    setVelocity(vol);
    await updateDoc(doc(db, "youtube", "params"), {
      velocity: vol,
    });
  }

  return (
    <Container onPress={() => Keyboard.dismiss()} activeOpacity={1}>
      <Input
        value={url}
        onChangeText={(url: any) => setUrl(url)}
        placeholder="COLE A URL AQUI"
      />
      <ButtonUrl onPress={handleChangeUrl}>
        <TextUrl>ADICIONAR URL</TextUrl>
      </ButtonUrl>

      <ButtonPlayPause onPress={() => handlePlayPause()}>
        <MaterialCommunityIcons name="play-pause" size={40} color="#fff" />
      </ButtonPlayPause>
      <Title>
        <Foundation name="volume" size={25} color="#fff" /> VOLUME
      </Title>
      <Slider
        style={{ width: "90%", height: 40 }}
        value={volume}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={(vol) => handleChangeVolume(vol)}
      />
      <Title>
        <Ionicons name="time" size={25} color="#fff" /> TEMPO DE VÍDEO
      </Title>
      <Slider
        style={{ width: "90%", height: 40 }}
        value={seek}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={(vol) => handleChangeTime(vol)}
      />
      <Title>
        <Ionicons name="speedometer" size={25} color="#fff" /> VELOCIDADE DO
        VÍDEO
      </Title>
      <ContainerButtonSpeed>
        <ButtonSpeed
          velocity={velocity === 1}
          onPress={() => handleChangeVelocity(1)}
        >
          <TextSpeed velocity={velocity === 1}>1x</TextSpeed>
        </ButtonSpeed>
        <ButtonSpeed
          velocity={velocity === 1.5}
          onPress={() => handleChangeVelocity(1.5)}
        >
          <TextSpeed velocity={velocity === 1.5}>1.5x</TextSpeed>
        </ButtonSpeed>
        <ButtonSpeed
          velocity={velocity === 2}
          onPress={() => handleChangeVelocity(2)}
        >
          <TextSpeed velocity={velocity === 2}>2x</TextSpeed>
        </ButtonSpeed>
      </ContainerButtonSpeed>
      <StatusBar style="auto" />
    </Container>
  );
}
