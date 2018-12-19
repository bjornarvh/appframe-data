import fs from 'fs';
import { importStaticScript } from '../src/import-static-script';
import fetchMock from 'jest-fetch-mock';

describe('importStaticScript', () => {
	it('works?', async () => {
		const staticScript = fs.readFileSync('./timereg-static.js', 'utf8');
		fetchMock.mockResponse(staticScript);
		const collection = await importStaticScript('timereg');
		console.log(collection);
	});
});