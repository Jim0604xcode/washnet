import Colors from "@/constants/Colors";
import React from "react";
import { Image, Text, View, StyleSheet, ColorSchemeName } from "react-native";

type CarouselSlideProps = {
  data: {
    title?: string;
    subtitle?: string;
    info: string;
    info2: string;
    info3: string;
    info4: string;
    image?: any;
  };
  colorScheme: ColorSchemeName;
};

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  data,
  colorScheme,
}) => {
  return (
    <View style={styles.slide}>
      <View style={styles.allTexts}>
        {/* Conditionally rendering title or subtitle */}
        {data.title ? (
          <Text
            style={[
              styles.title,
              { color: Colors[colorScheme ?? "light"].tint },
            ]}
          >
            {data.title}
          </Text>
        ) : (
          <Text
            style={[
              styles.subtitle,
              { color: Colors[colorScheme ?? "light"].tint },
            ]}
          >
            {data.subtitle}
          </Text>
        )}
        <Text
          style={[styles.info, { color: Colors[colorScheme ?? "light"].text }]}
        >
          {data.info}
        </Text>
        <Text
          style={[styles.info, { color: Colors[colorScheme ?? "light"].text }]}
        >
          {data.info2}
        </Text>
        <Text
          style={[styles.info, { color: Colors[colorScheme ?? "light"].text }]}
        >
          {data.info3}
        </Text>
        <Text
          style={[styles.info, { color: Colors[colorScheme ?? "light"].text }]}
        >
          {data.info4}
        </Text>
      </View>
      {data.image ? <Image source={data.image} style={styles.img} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  allTexts: {
    gap: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6,
  },
  info: {
    fontSize: 16,
    fontWeight: "400",
  },
  img: {
    width: "50%",
    height: "120%",
  },
});

export default CarouselSlide;
