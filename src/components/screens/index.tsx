import React from "react";
import { View, TextInput,Text } from "react-native";
import {styles} from "./styles";
import {Feather} from "@expo/vector-icons";

type Props = {
    icon : keyof typeof Feather.glyphMap;
}

export function Input({icon}: Props){
    return(
        <View style={styles.group}>
            <Feather name ={icon} size={24} color="grey"/>
            <TextInput style={ styles.control}/>
        </View>
    )
}

