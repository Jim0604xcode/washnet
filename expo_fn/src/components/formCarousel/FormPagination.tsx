import { StyleSheet, ColorSchemeName, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import Colors from "@/src/constants/Colors";
import FormDot from "@/src/components/formCarousel/FormDot"

type FormPaginationProps = {
  carouselData: any
  progressValue: SharedValue<number>;
};

const FormPagination: React.FC<FormPaginationProps> = ({
  carouselData,
  progressValue,
}) => {
  return (
    <View style={styles.paginationBox}>
      {carouselData.map((_: any, index: any) => (
        <FormDot
          backgroundColor={Colors.light.tint}
          animValue={progressValue}
          index={index}
          isRotate={false}
          key={index}
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
    width: 220,
    marginBottom: 10
  },
});

export default FormPagination;
