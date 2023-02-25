import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const GAPI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sort, setSort] = useState("stars");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchTerm}&sort=${sort}`
      );
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = (item) => {
    return (
      <View key={item.id} style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{ uri: item.owner.avatar_url }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>⭐ {item.stargazers_count}</Text>
          </View>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.footer}>
          <View style={styles.languageContainer}>
            <Text style={styles.language}>{item.language}</Text>
          </View>
          <Text style={styles.timestamp}>
            Updated: {new Date(item.updated_at).toDateString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gapiText}>GAPI (Github-API) 👌</Text>
      <View style={styles.searchBar}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.input}
            placeholder="Search Github Repositories"
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
          />
          <TouchableOpacity
            onPress={handleSearch}
            style={{
              borderWidth: 1,
              borderColor: "#000",
              marginRight: 0,
              borderRadius: 20,
              width: "15%",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>↓</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sortLabel}>sort by:</Text>
        <View style={styles.sort}>
          {/* <Text style={styles.sortLabel}>Sort by:</Text> */}
          <TouchableOpacity
            onPress={() => setSort("stars")}
            style={[
              styles.button,
              {
                borderWidth: sort === "stars" ? 1 : 0,
                borderColor: "#000",
              },
            ]}
          >
            <Text style={styles.buttonText}>Stars</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSort("watchers")}
            style={[
              styles.button,
              { borderWidth: sort === "watchers" ? 1 : 0, borderColor: "#000" },
            ]}
          >
            <Text style={styles.buttonText}>Watchers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSort("score")}
            style={[
              styles.button,
              { borderWidth: sort === "score" ? 1 : 0, borderColor: "#000" },
            ]}
          >
            <Text style={styles.buttonText}>Score</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSort("name")}
            style={[
              styles.button,
              { borderWidth: sort === "name" ? 1 : 0, borderColor: "#000" },
            ]}
          >
            <Text style={styles.buttonText}>Name</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSort("created")}
            style={[
              styles.button,
              { borderWidth: sort === "created" ? 1 : 0, borderColor: "#000" },
            ]}
          >
            <Text style={styles.buttonText}>Created</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSort("updated")}
            style={[
              styles.button,
              { borderWidth: sort === "updated" ? 1 : 0, borderColor: "#000" },
            ]}
          >
            <Text style={styles.buttonText}>Updated</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.repoLabel}>repositories:</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {searchResults.map(renderItem)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    padding: responsiveWidth(5),
    height: "100%",
    backgroundColor: "#fff",
  },
  gapiText: {
    marginTop: responsiveHeight(5),
    textAlign: "center",
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
  },
  searchBar: {
    height: responsiveHeight(20),
    width: responsiveWidth(90),
    flexDirection: "column",
    // alignItems: "center",
    marginTop: responsiveHeight(3),
  },
  input: {
    borderWidth: responsiveWidth(0.3),
    borderColor: "#000",
    padding: responsiveWidth(2),
    marginRight: responsiveWidth(1),
    borderRadius: responsiveWidth(4),
    width: responsiveHeight(40),
  },
  sort: {
    height: responsiveHeight(7),
    width: responsiveWidth(93),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: responsiveWidth(0.3),
    borderColor: "#000",
    borderRadius: responsiveWidth(4),
  },
  button: {
    // width: "20%",
    // height: "100%",
  },
  buttonText: {
    fontSize: responsiveFontSize(1.9),
    margin: responsiveWidth(1.5),
  },
  sortLabel: {
    marginRight: responsiveWidth(4),
    fontWeight: "bold",
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(1),
    marginTop: responsiveHeight(1),
  },
  repoLabel: {
    marginRight: responsiveWidth(4),
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.5),
    marginBottom: responsiveHeight(1),
    marginTop: responsiveHeight(0.5),
  },
  card: {
    backgroundColor: "#fff",
    color: "#fff",
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(4),
    padding: responsiveWidth(5),
    margin: responsiveWidth(1),
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveWidth(3),
  },
  avatar: {
    width: responsiveWidth(15),
    height: responsiveHeight(7),
    marginRight: responsiveWidth(3),
    borderRadius: responsiveWidth(4),
  },
  title: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "bold",
    marginBottom: responsiveHeight(0.1),
  },
  subtitle: {
    color: "#666",
    fontSize: responsiveFontSize(2),
  },
  description: {
    marginBottom: responsiveHeight(1.5),
    fontSize: responsiveFontSize(2),
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  languageContainer: {
    paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveWidth(1),
    marginRight: responsiveWidth(1),
  },
  language: {
    color: "#000",
    borderRadius: responsiveWidth(2),
    padding: responsiveWidth(2),
    borderWidth: 1,
    fontWeight: "bold",
    fontSize: responsiveFontSize(2),
  },
  timestamp: {
    color: "#666",
    fontSize: responsiveFontSize(2),
  },
});

export default GAPI;
