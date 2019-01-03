import fs from 'fs';
import { importStaticScript } from '../src/import-static-script';
import fetchMock from 'jest-fetch-mock';

describe('importStaticScript', () => {
	it('works', async () => {
		const staticScript = fs.readFileSync('./tests/timereg-static.js', 'utf8');
		fetchMock.mockResponse(staticScript);
		const collection = await importStaticScript('timereg');

		const dsPurposeTimeregAdm = collection.getDataObject('dsPurposeTimeregAdm');
		expect(dsPurposeTimeregAdm).toBeTruthy();
		// @ts-ignore
		expect(dsPurposeTimeregAdm.dataSourceId).toBe('dsPurposeTimeregAdm');

		const procValidate = collection.getProcedure('procValidate');
		expect(procValidate).toBeTruthy();
		// @ts-ignore
		expect(procValidate.procedureId).toBe('procValidate');
	});
});