import styled from "styled-components";

export const Container = styled.TouchableOpacity`
  flex: 1;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: #1c232e;
  align-items: center;
  justify-content: space-evenly;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 25px;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  width: 90%;
  height: 40px;
`;

export const ButtonPlayPause = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: red;
  align-items: center;
  justify-content: center;
  border-radius: 500px;
`;

export const ButtonUrl = styled.TouchableOpacity`
  width: 300px;
  height: 80px;
  border-radius: 8px;
  background-color: #0e9094;
  align-items: center;
  justify-content: center;
`;

export const TextUrl = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const ContainerButtonSpeed = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;

export const ButtonSpeed = styled.TouchableOpacity`
  background-color: ${(props: { velocity: number }) =>
    props.velocity ? `#0e9094` : `#fff`};
  height: 50px;
  width: 50px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const TextSpeed = styled.Text`
  color: ${(props: { velocity: number }) => (props.velocity ? `#fff` : `#000`)};
  font-weight: bold;
`;
