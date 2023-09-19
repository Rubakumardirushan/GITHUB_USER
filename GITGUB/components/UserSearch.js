// components/UserSearch.js

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Image } from 'react-native';
import { Avatar } from 'react-native-elements'; // Import Avatar from react-native-elements

const UserSearch = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!username) {
      setUserData(null); // Reset user data when username is empty
      return;
    }

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [username]);

  return (
    <View>
      <TextInput
        placeholder="Enter GitHub username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Button title="Search" onPress={() => setUsername(username)} />
      {userData && (
        <View>
          <Avatar
            rounded
            size="xlarge"
            source={{ uri: userData.avatar_url }} // Display user's avatar
          />
          <Text>Name: {userData.name}</Text>
          <Text>Username: {userData.login}</Text>
          <Text>Followers: {userData.followers}</Text>
          <Text>Following: {userData.following}</Text>
          <Text>Public Repos: {userData.public_repos}</Text>
        </View>
      )}
    </View>
  );
};

export default UserSearch;
