//import axios from 'axios';
import Together from 'together-ai';

const getData = async (input: string) => {
    try{
        const together = new Together({ apiKey: 'key' });
        const stream = await together.chat.completions.create({
            messages: [{ role: 'user', content: input }],
            model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
            max_tokens: 512,
            temperature: 0.7,
            top_p: 0.7,
            top_k: 50,
            repetition_penalty: 1,
            stop: ["<|eot_id|>", "<|eom_id|>"],
            stream: true
        });
        let string = ""
        for await (const chunk of stream) {
            if (chunk.choices?.[0]?.delta) {
                string += chunk.choices[0].delta.content;
            }
            console.log(string);
        }
        console.log("\nStreaming completed.");
        return string;
    }
    catch(error){
        console.error('Error sending message',error);
    } 
};
export default getData;
