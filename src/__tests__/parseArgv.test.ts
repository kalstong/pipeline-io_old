
// test with jest
import { parseArgv } from '../lib/utils';

describe('parseArgv', () => {
    it('should return an object', (done) => {
        const args = [
            '/Users/kal/Code/reelio/pipeline-io/node_modules/.bin/ts-node',
            '/Users/kal/Code/reelio/pipeline-io/src/index.ts',
            '--pipeline',
            './src/__tests__/pipeline_helloworld.yaml'
        ];
        const rename = {};
        const skip = 2;
        const parsedArgs = parseArgv(args, rename, skip);

        expect(parsedArgs).toBeInstanceOf(Object);
        expect(parsedArgs).toHaveProperty('pipeline');
        expect(parsedArgs).toHaveProperty('pipeline.value');
        expect(parsedArgs).toHaveProperty('pipeline.longSwitch');
        expect(parsedArgs).toHaveProperty('pipeline.shortSwitch');
        done();
    });

    it('should have longSwitch', (done) => {
        const args = [
            '/Users/kal/Code/reelio/pipeline-io/node_modules/.bin/ts-node',
            '/Users/kal/Code/reelio/pipeline-io/src/index.ts',
            '--pipeline',
            './src/__tests__/pipeline_helloworld.yaml'
        ];
        const rename = {};
        const skip = 2;
        const parsedArgs = parseArgv(args, rename, skip);
          
        expect(parsedArgs?.pipeline.longSwitch).toBe(true);
        expect(parsedArgs?.pipeline.shortSwitch).toBe(false);

        done();
    });

    it('should have shortSwitch', (done) => {
        const args = [
            '/Users/kal/Code/reelio/pipeline-io/node_modules/.bin/ts-node',
            '/Users/kal/Code/reelio/pipeline-io/src/index.ts',
            '-p',
            './src/__tests__/pipeline_helloworld.yaml'
        ];
        const rename = { 'p': 'pipeline'};
        const skip = 2;
        const parsedArgs = parseArgv(args, rename, skip);
        
        expect(parsedArgs?.pipeline.longSwitch).toBe(false);
        expect(parsedArgs?.pipeline.shortSwitch).toBe(true);

        done();
    });

    it('should remap arguments', (done) => {
        const args = [
            '/Users/kal/Code/reelio/pipeline-io/node_modules/.bin/ts-node',
            '/Users/kal/Code/reelio/pipeline-io/src/index.ts',
            '-p',
            './src/__tests__/pipeline_helloworld.yaml'
        ];
        const rename = { 'p': 'pipeline'};
        const skip = 2;
        const parsedArgs = parseArgv(args, rename, skip);
        
        expect(parsedArgs).toHaveProperty('pipeline');

        done();
    });

});