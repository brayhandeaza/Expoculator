import { useState, useRef } from 'react';
import { HStack, Heading, NativeBaseProvider, VStack, Button, Text, Stack } from 'native-base';
import { SafeAreaView, StyleSheet, Dimensions, Platform } from 'react-native';
import { useEffect } from 'react';

const { width, height } = Dimensions.get("screen")
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
		console.log(Platform.OS)

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

	return (
		<NativeBaseProvider>
			<SafeAreaView>
				<Stack style={styles.container}>
					<VStack style={Platform.OS === "web" ? styles.shadow : {}} pb={"40px"} pt={"80px"} justifyContent={"flex-end"}>
						<VStack pr={"20px"}>
							<HStack  pl={"20px"} justifyContent="flex-end">
								<Heading color={"gray.600"} fontSize={"45px"} fontWeight={"bold"}>{!result ? "0" : result}</Heading>
							</HStack>
							<HStack h={"40px"} alignItems="center" justifyContent="flex-end">
								<Heading p={"10px"} color={"gray.400"} fontSize={"20px"} alignItems="center" fontWeight={"bold"}>{currentValue}</Heading>
							</HStack>
						</VStack>
						<HStack p={"10px"} w={Platform.OS === "web" ? "360px" : width} mt={"50px"} flexWrap="wrap" justifyContent={"space-between"}>
							{Array(19).fill().map((_, key) => (
								<Button onPress={() => onPress(buttonValue(key))} _hover={{ background: "#FFCB89" }} _pressed={{ background: buttonColor(key).pressed }} bg={buttonColor(key).bg} fontSize={"40px"} style={key === 18 ? styles.buttonsEqual : styles.buttons}>
									<Text pt={key === 7 && "10px"} pb={key === 17 && "10px"} fontSize={"25px"} color={buttonColor(key).color} fontWeight={"bold"}>{buttonValue(key)}</Text>
								</Button>
							))}
						</HStack>
					</VStack>

				</Stack>
			</SafeAreaView>
		</NativeBaseProvider>
	);
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: '#171717',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		borderRadius: 30,
		width: Platform.OS === "web" ? "360px" : width,
	},
	container: {
		width,
		height,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttons: {
		width: Platform.OS === "web" ? 360 / 4 - 30 : width / 4 - 30,
		height: Platform.OS === "web" ? 360 / 4 - 30 : width / 4 - 30,
		borderRadius: 100,
		margin: 10,
		fontSize: 28,

	},
	buttonsEqual: {
		width: Platform.OS === "web" ? (360 / 4 - 30) * 2 : (width / 4 - 30) * 2,
		height: Platform.OS === "web" ? 360 / 4 - 40 : width / 4 - 40,
		borderRadius: 100,
		margin: 20,
		marginBottom: 15,
	}
})
