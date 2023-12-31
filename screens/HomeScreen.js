import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SignOut } from '../hooks/useAuth'
import { AntDesign } from '@expo/vector-icons';
import { Card, Title, Paragraph, Divider, Searchbar, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


export default function HomeScreen() {

  const navigation = useNavigation();
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(true)
  const [error, setError] = useState(null);

  const [countLiked, setCountLiked] = React.useState(0);
  const [comment, setcomment] = React.useState(false);
  const [countComment, setCountComment] = React.useState(0);

  function handleLiked() {
    setCountLiked(countLiked + 1);
  }
  function handleComment() {
    setcomment(!comment)
    setCountComment(countComment + 1);
  }

  useEffect(() => {

    fetch("http://192.168.87.170:4000/getPostWithUserId")

      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result);
      },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const handleLogout = () => {
    SignOut(success, unsuccess);
  };

  const success = (msg) => {
    Alert.alert(` ${msg} `)
    navigation.push('Welcome')
  }

  const unsuccess = (msg) => {
    console.log(msg)
    Alert.alert(msg)
  }

  const renderPost = ({ item }) => (
    <Card style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "5%", paddingBottom: "5%" }}>
      <Card.Title style={{ fontSize: 20 }}
        title={item.name}
        subtitle={item.post_date}
        left={() => {
          return (
            <Avatar.Image source={{ uri: item.photoURL }} size={50} />
          )
        }} />
      <Card.Content>
        <Title>{item.post_title}</Title>
      </Card.Content>
      <View style={{ flexDirection: "row", paddingTop: "2%" }}>
        {item.post_img.length > 0 ?
          <Card.Cover
            source={{ uri: item.post_img }}
            style={{ width: "100%", height: 500 }} />
          : <View></View>}
        <View></View>
      </View>
      <Card.Actions>
          <View style={{flexDirection: 'row' }}>
            <TouchableOpacity>
              <AntDesign name="like1" size={24} color="black" />
            </TouchableOpacity>
            <View><Text style={{fontSize:16}}>Like</Text></View>
          </View>
        </Card.Actions>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 12 }}>
      <View style={styles.navBar}>
        <Text style={{ fontWeight: "bold", fontSize: 30, color: "#F1C40F" }}>BlueBird</Text>
        <TouchableOpacity style={{}}
          onPress={handleLogout}>
          <FontAwesome name="sign-out" size={30} color="#F1C40F" />
        </TouchableOpacity>
      </View>


      <View style={{ flex: 10 }}>
        <FlatList
          data={items}
          renderItem={renderPost}
          keyExtractor={item => item.id}
        />
      </View>


      <View style={styles.navBar}>
        <TouchableOpacity style={styles.button_nav}
          onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="home" size={26} color="#F1C40F" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_nav}
          onPress={() => navigation.navigate('Search')}>
          <FontAwesome name="search" size={26} color="#F1C40F" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_nav}
          onPress={() => navigation.navigate('Post')}>
          <FontAwesome name="file-photo-o" size={26} color="#F1C40F" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_nav}
          onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="user-circle-o" size={26} color="#F1C40F" />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#00007e"
  },
  button_nav: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  postContainer: {
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  caption: {
    marginTop: 5,
  },
  likes: {
    color: 'blue',
  },

});
