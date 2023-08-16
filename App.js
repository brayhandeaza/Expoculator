import { useState, useRef } from 'react';
import { HStack, Heading, NativeBaseProvider, VStack, Button, Text } from 'native-base';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { useEffect } from 'react';

const { width } = Dimensions.get("window")
export default function App() {
	const ref = useRef()
	const [currentValue, setCurrentValue] = useState("")
	const [result, setResult] = useState("0")
	const [isMaxLength, setIsMaxLength] = useState(false)



	const buttonValue = (index) => {
		switch (index) {
			case 0:
				return "C"
			case 1:
				return "+/-"
			case 2:
				return "%"
			case 3:
				return "/"
			case 4:
				return "7"
			case 5:
				return "8"
			case 6:
				return "9"
			case 7:
				return "*"
			case 8:
				return "4"
			case 9:
				return "5"
			case 10:
				return "6"
			case 11:
				return "-"
			case 12:
				return "1"
			case 13:
				return "2"
			case 14:
				return "3"
			case 15:
				return "+"
			case 16:
				return "0"
			case 17:
				return "."
			case 18:
				return "="
			default:
				return index + 3
		}
	}

	const buttonColor = (index) => {
		switch (index) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 7:
			case 11:
			case 15:
				return {
					color: "gray.400",
					bg: "gray.100",
					pressed: "gray.200",
				}
			case 18:
				return {
					color: "white",
					pressed: "gray.100",
					bg: "#FFCB89"
				}

			default:
				return {
					color: "gray.500",
					pressed: "gray.100",
					bg: "white"
				}
		}
	}



	const formatNumber = (number) => {
		if (number < 0.99 && number > 0.009)
			return parseFloat(number).toFixed(2)

		else if (number < 0.009 && number > 0.0009)
			return parseFloat(number).toFixed(4)

		else if (number < 0.0009 && number > 0.00009)
			return parseFloat(number).toFixed(5)

		else if (number < 0.00009 && number > 0.000009)
			return parseFloat(number).toFixed(6)

		else if (number < 0.000009 && number > 0.0000009)
			return parseFloat(number).toFixed(7)

		else if (number < 0.0000009 && number > 0.00000009)
			return parseFloat(number).toFixed(8)

		else if (number < 0.00000009 && number > 0.000000009)
			return parseFloat(number).toFixed(9)

		else {
			setIsMaxLength(true)
			return parseFloat(number).toExponential(4)
		}
	}


	const onPress = (value) => {
		const lastValue = currentValue.slice(-3)

		switch (value) {
			case "C":
				setCurrentValue("")
				setResult("")
				break;
			case "+/-":
				if (result[0] === "-" && parseFloat(result) >= 0)
					setResult(`${result}`.replace("-", ""))

				if (result[0] !== "-" && parseFloat(result) >= 0)
					setResult(`${result}`)

				break;
			case "-":
			case "+":
			case "/":
			case "*":

				if (lastValue.trim() !== "-" && lastValue.trim() !== "+" && lastValue.trim() !== "/" && lastValue.trim() !== value) {
					setCurrentValue(currentValue + ` ${value} `)
				}
				break;
			case ".":
				if (parseFloat(result) >= 0 && lastValue.trim() !== value) {
					setCurrentValue(currentValue + ` ${value} `)
				}
				break;
			case "%":
				if (parseFloat(result) >= 0 && !isMaxLength) {
					const evalValue = eval(currentValue) / 100
					setResult(formatNumber(evalValue))
					setCurrentValue(result + " / 100")
				}

				break;
			default:
				if (parseFloat(value) >= 0) {
					setCurrentValue(currentValue + value)
					setResult(eval((currentValue + value).replaceAll(" ", "")))
				}
				break;
		}
	}

	const handleTextLayout = (e) => {
		// console.log({
		// 	width: e.nativeEvent.layout.width / 30,
		// 	result: parseInt(width / 34 - 2),
		// 	max: e.nativeEvent.layout.width / 30 >= parseInt(width / 34 - 2),
		// 	screen: width
		// })
	}

	return (
		<NativeBaseProvider>
			<SafeAreaView>
				<VStack h="100%" p={"20px"} pb={"40px"} pt={"80px"} justifyContent={"flex-end"}>
					<VStack>
						<HStack pr={"20px"} pl={"20px"} alignItems="center" justifyContent="flex-end">
							<Heading onLayout={handleTextLayout} color={"gray.600"} fontSize={"45px"} fontWeight={"bold"}>{!result ? "0" : result}</Heading>
						</HStack>
						<HStack alignItems="center" justifyContent="flex-end">
							<Heading p={"10px"} color={"gray.400"} fontSize={"20px"} alignItems="center" fontWeight={"bold"}>{currentValue}</Heading>
						</HStack>
						{/* <Heading p={"10px"} color={"gray.400"} fontSize={"20px"} alignItems="center" fontWeight={"bold"}>{currentValue}</Heading> */}
					</VStack>
					<HStack mt={"50px"} flexWrap justifyContent={"space-between"}>
						{Array(19).fill().map((_, key) => (
							<Button onPress={() => onPress(buttonValue(key))} _pressed={{ background: buttonColor(key).pressed }} key={key} bg={buttonColor(key).bg} fontSize={"40px"} style={key === 18 ? styles.buttonsEqual : styles.buttons}>
								<Text pt={key === 7 && "10px"} pb={key === 17 && "10px"} fontSize={"25px"} color={buttonColor(key).color} fontWeight={"bold"}>{buttonValue(key)}</Text>
							</Button>
						))}
					</HStack>
				</VStack>
			</SafeAreaView>
		</NativeBaseProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttons: {
		width: width / 4 - 30,
		height: width / 4 - 30,
		borderRadius: 100,
		margin: 10,
		fontSize: 28,

	},
	buttonsEqual: {
		width: (width / 4 - 30) * 2,
		height: width / 4 - 40,
		borderRadius: 100,
		margin: 20,
		marginBottom: 15,

	}
});
