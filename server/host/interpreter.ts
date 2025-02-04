import openai from "openai";
import { ChatCompletionUserMessageParam } from "openai/resources";

export class Interpreter {
	private readonly model = 'gpt-4o';
	private readonly temperature = 0.8;

	private openai = new openai({
		apiKey: process.env.OPENAI_SECRET
	});

	async verify(prompt: string, ...data: string[]) {
		let generator = await this.openai.chat.completions.create({
			stream: true,
			messages: [
				{
					role: 'system',
					content: prompt,
				},
				{
					role: 'system',
					content: 'Respond YES if the question is true, respond NO if not'
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

		response = response.trim();

		if (response == 'YES') {
			return true;
		}

		if (response == 'NO') {
			return false;
		}

		return await this.verify(prompt, ...data);
	}

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
