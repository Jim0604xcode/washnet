import Colors from "@/constants/Colors";
import React from "react";
import { Image, Text, View, StyleSheet, ColorSchemeName, ImageBackground, useColorScheme } from "react-native";

type CarouselSlideProps = {
  data: {
    title?: string;
    type: string;
    infos: string | string[] | { text: string, checked: boolean }[] | any;
    image?: any;
  };
};

const imageList = [
  { serivce: "pw",
    src: require('@/assets/images/drawing-1.png')},
]

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  data,
}) => {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.slide}>
      <View style={styles.textBox}>
        {/* Conditionally rendering title or subtitle */}
        <Text
          style={[
            styles.title,
            { color: Colors[colorScheme ?? "light"].tint },
          ]}
        >
          {data.title}
        </Text>
        {
          data.type === "paragraph" &&

          <Text style={[styles.info, { color: Colors[colorScheme ?? "light"].text }]}>
            {data.infos}
          </Text>
          
        }
        {
          data.type === "checklist" &&
          data.infos.map((obj: { text: string, checked: boolean }, id: number) =>
            <Text style={[styles.info, { color: Colors[colorScheme ?? "light"].text }]} key={id} >
              {obj.text}
            </Text>)
        }
        {
          data.type === "list" &&
          data.infos.map((info: string, id: number) => (
            <Text style={[styles.info, { color: Colors[colorScheme ?? "light"].text }]} key={id} >
              {info}
            </Text>
          ))
        }

      </View>
      {(data.type === "list") ? (
      <Image source={imageList[0].src} style={styles.img} />
      ) : (null)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textBox: {
    gap: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 29,
    fontWeight: "700",
    marginBottom: 6,
  },
  info: {
    fontSize: 18,
    fontWeight: "400",
  },
  img: {
    width: "50%",
    height: "100%",
  },
});

export default CarouselSlide;