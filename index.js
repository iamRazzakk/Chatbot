const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const genAI = new GoogleGenerativeAI("AIzaSyDH8eJhzmcBsg41IOoK797NmwvUeycx2LI")

const myFun = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const res = await result.response;
        return res.text();  // Returns the response text
    } catch (error) {
        return "Sorry, I encountered an error";
    }
};

const mainFun = async () => {
    while (true) {
        const user_input = await new Promise((resolve) => {
            rl.question("You: ", (input) => resolve(input));
        });

        // Exit the loop if user inputs "quit", "exit", or "bye"
        if (["quit", "exit", "bye"].includes(user_input.toLowerCase())) {
            console.log("Chatbot: Goodbye");
            rl.close();
            break;
        }

        const res = await myFun(user_input);
        console.log("Chatbot:", res);
    }
};
mainFun()