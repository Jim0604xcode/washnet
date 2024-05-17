import { StyleSheet, ColorSchemeName, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import Colors from "@/constants/Colors";
import PaginationDot from "@/components/carousel/PaginationDot";

type PaginationProps = {
  // carouselData: {
  //   title?: string;
  //   subtitle?: string;
  //   info: string;
  //   info2: string;
  //   info3: string;
  //   info4: string;
  //   image?: string;
  // }[];
  carouselData: any[];
  progressValue: SharedValue<number>;
  colorScheme: ColorSchemeName;
};

const Pagination: React.FC<PaginationProps> = ({
  carouselData,
  progressValue,
  colorScheme,
}) => {
  return (
    <View style={styles.paginationBox}>
      {carouselData.map((_, index) => (
        <PaginationDot
          backgroundColor={Colors[colorScheme ?? 'light'].tint}
          animValue={progressValue}
          index={index}
          isRotate={false}
          key={index}
          colorScheme={colorScheme}
          length={carouselData.length}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 46,
  },
});

export default Pagination;
