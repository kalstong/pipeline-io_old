import { Engine } from '../Engine';
// import { IPipeline } from '../interfaces/PipelineInterfaces';

describe('Engine', () => {
    it('should be an instance of Engine', (done) => {
        const pipeline = {
            connections: [],
            variables: [],
            callbacks: [],
            start: [],
            pipeline: []
        };

        const engine = new Engine(pipeline);
        expect(engine).toBeInstanceOf(Engine);
        done();
    });

    it('should return a copy of pipeline', (done) => {
        const pipeline = {
            connections: [],
            variables: [],
            callbacks: [],
            start: [],
            pipeline: []
        };

        const engine = new Engine(pipeline);

        const _pipeline = engine.getPipeline();
        _pipeline.start = ['test'];

        const _pipeline2 = engine.getPipeline();

        expect(_pipeline2.start).toStrictEqual([]);
        done();     
    });

    // it('should throw error on invalid pipeline', (done) => {
    //     const pipeline = {};

    //     const engine = new Engine(pipeline as IPipeline);

    //     expect(engine).toThrow(Error);
    //     done();     
    // });
});