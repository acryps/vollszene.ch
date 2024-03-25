import openai from "openai";
import { ChatCompletionUserMessageParam } from "openai/resources";

export class Interpreter {
	private readonly model = 'gpt-3.5-turbo';
	private readonly temperature = 0.8;
	
	private openai = new openai({
		organization: process.env.OPENAI_ORGANIZATION,
		apiKey: process.env.OPENAI_SECRET
	});
	
	async develop(prompt: string, ...data: string[]) {
		let generator = await this.openai.chat.completions.create({
			temperature: this.temperature,
			stream: true,
			messages: [
				{
					role: 'system',
					content: prompt,
				},
				...data.map(item => ({
					role: 'user', 
					content: item
				})) as ChatCompletionUserMessageParam[]
			],
			model: this.model
		});
		
		let response = '';
		
		for await (const chunk of generator) {
			response += chunk.choices[0]?.delta?.content ?? '';
		}
		
		if (response.startsWith('```')) {
			// header
			response = response.replace('```javascript', '');
			response = response.replace('```js', '');
			response = response.replace('```', '');
			
			// footer
			response = response.replace('```', '');
		}
		
		console.debug(response);
		
		return response;
	}
}
