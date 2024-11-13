import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const openAPI = async(text) => {
    try {
        const chatModel = new ChatOpenAI({
            openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
            temperature: 0.7,
            maxTokens: 500  // Add a reasonable limit
        });
        
        const outputParser = new StringOutputParser();
        
        const prompt = ChatPromptTemplate.fromMessages([
            ["system", "You are someone who knows how to summarize things. You give the summary, but you pass some slick and savage comments along the answer. The tweets are recent tweets from twitter."],
            ["user", "{input}"],
        ]);
        
        const llmChain = prompt.pipe(chatModel).pipe(outputParser);
        
        const out = await llmChain.invoke({
            input: text,
        });
        return out;
    } catch (error) {
        console.error("Error in OpenAI API call:", error);
        throw new Error("Failed to generate summary");
    }
}

export default openAPI;