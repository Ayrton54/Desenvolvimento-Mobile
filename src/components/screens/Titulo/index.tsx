import { View, Text } from "react-native";
import {styles} from "./styles";
import { Input } from "..";

export function Titulo(){
   return( <View style={styles.container}>
        <Text style={styles.title}>
            KeyMaster
        </Text>
        <Input icon="user"/>
    </View>)
}

