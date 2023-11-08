import {
	inputTextToRedact,
	inputReplace,
	redactBtn,
	chatBox,
} from "./elements.js";
import { createMessage, createReply } from "./helper.js";

const chatsList = [{ chatObj: undefined, chatTitle: undefined }];
chatsList.chatObj = [
	[
		"How do I use this app",
		`
1. Open the app in a web browser. <br>
2. Enter your original text in the provided text field. <br>
3. Specify the words to redact and their replacements in the format "word1/replacement1, word2/replacement2, ...". <br>
4. Click the "Redact Now" button. <br>
5. View the redacted text on the app's interface. <br>
6. Share or copy the redacted text if needed. <br>
<br>
Make sure to follow the pattern "word/replacement" for each word you want to redact, separated by commas and without spaces around the slashes ("/"). The app should process the input accordingly and display the redacted text.`,
	],
];
const chatObj = chatsList.chatObj;
const redactText = function () {
	const textToRedact = inputTextToRedact.value.trim();
	const textToReplace = inputReplace.value.trim();

	const textToRedactArr = textToRedact.split(" ");

	if (!textToRedact || !textToReplace) return;

	const wordsToReplace = textToReplace.split(",");
	let result = textToRedact;

	try {
		wordsToReplace.forEach((element) => {
			const arr = element.split("/");
			console.log(arr);

			if (arr.length === 1)
				throw new Error("You put a comma where it's not suppossed to be 🤦");
			const regex = new RegExp(`\\b${arr[0]}\\b`, "gi");
			if (!regex.test(result)) throw new Error(`Could not find ${arr[0]}`);

			if (arr[1].length > 1) {
				result = result.replace(regex, arr[1]);
				console.log(result, "Hii");
			} else if (arr[1].length === 1) {
				let textToReplaceWith = "";

				for (let i = 0; i < arr[0].length; i++) {
					textToReplaceWith += arr[1];
				}
				result = result.replaceAll(regex, textToReplaceWith);
			}
		});

		chatObj.push([textToRedact, result]);
		updateChat();
	} catch (err) {
		if (err.name == "TypeError") {
			alert("Something went wrong. Check your pattern of matching.");
		} else {
			alert(err);
		}

		console.log(err);
	}
};

const updateChat = function () {
	chatObj.forEach((element, i, arr) => {
		if (i === arr.length - 1) {
			chatBox.innerHTML += createMessage(element[0], i);
			setTimeout(() => {
				chatBox.innerHTML += createReply(element[1], i);
			}, 300);
		}
	});
};

const shareRedacted = function (e) {};

const readChat = function () {
	chatObj.forEach((element, i, arr) => {
		if (arr.lenght === 1) {
			setTimeout(() => {
				chatBox.innerHTML += createMessage(element[0], i);
			}, 1000);
			setTimeout(() => {
				chatBox.innerHTML += createReply(element[1], i);
			}, 3000);
		} else {
			chatBox.innerHTML += createMessage(element[0], i);
			chatBox.innerHTML += createReply(element[1], i);
		}
	});

	console.log("ell");
};
chatBox.addEventListener("click", function (e) {
	if (e.target.closest(".buttons--share")) {
		const position = +e.target.closest(".reply").dataset.message;

		const message = chatObj[position][1];
		console.log(message);
	}
});
readChat();
redactBtn.addEventListener("click", redactText);
