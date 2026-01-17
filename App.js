import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, Image, TextInput, View} from 'react-native';

// Create a new variable named originalData
let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    // Exercise 1B - add useEffect()
    useEffect(() => {
        // Add fetch() - Exercise 1A
        const myurl = "https://onlinettcalbumappwebservice1.onrender.com/allalbums"
        fetch(myurl)
            .then((response)=>{
                return response.json();
            })
            .then((myJson)=>{
                setMyData(myJson);
                originalData = myJson;
            })
    }, []);

    const FilterData = (text) => {
        if(text!='') {
            let myFilteredData = originalData.filter((item) =>
                item.album_name.toLowerCase().includes(text.toLowerCase()));
            setMyData(myFilteredData);
        }
        else {
            setMyData(originalData);
        }
    }

    const renderItem = ({item, index}) => {
        // return (
        //     <View>
        //         <Text style={{borderWidth:1}}>{item.album_name}</Text>
        //     </View>
        // );
        return (
            <View style={{
                flexDirection: "row",
                borderWidth: 1,
                padding: 10,
                margin: 5,
                alignItems: "center"
            }}>

                <Image
                    source={{ uri: item.album_cover_art }}
                    style={{
                        width: 80,
                        height: 110,
                        marginRight: 10
                    }}
                    resizeMode="contain"
                />

                <Text>
                    {item.album_name}
                </Text>

            </View>
        );
    };

    return (
        <View>
            <StatusBar/>
            <Text>Search:</Text>
            {/*<TextInput style={{borderWidth:1}}/>*/}
            <TextInput style={{borderWidth:1}} onChangeText={(text)=> {FilterData(text)}}></TextInput>
            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default App;
