import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";


const openAPI = async(text) => {
    const chatModel = new ChatOpenAI({
        openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY
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
}

export default openAPI