import YAML from 'yaml';
import { logger } from './lib/logger';
import { parseArgv, openFileSync } from './lib/utils';
import { IPipeline } from './interfaces/PipelineInterfaces';
import { Engine } from './Engine';

// Boot and welcoming
process.title = `pipeline-io`
logger.info(`Welcome to pipeline-io!\n`);

process.on('unhandledRejection', function (err /*, promise */) {
    logger.error('Critical error. Unhandled Rejection detected. Program will stop.', err)
    process.exit(1)
});

const main = async () => {

    // Load Arguments
    let args: Record<string, Record<string, unknown>> | null = {}
    try {
        args = parseArgv(process.argv, {}, 2)
    } catch (err) {
        logger.error('Failed to parse process arguments.', err)
    } 

    try {
        const pipelineContent: string | undefined = openFileSync(args?.pipeline?.value as string)
        if (!pipelineContent) {
            logger.warn('No pipeline specified or cannot be loaded. Nothing to do, program will stop.')
            process.exit(0)
        }

        const pipelineObj: IPipeline = YAML.parse(pipelineContent)
        const engine = new Engine(pipelineObj)


        
        // engine.load(pipelineObj)
        // .then(() => {
        //     engine.start()
        //     .catch(err => {
        //         log('engine').error('Critical error. Pipeline start has failed.', err)
        //     })
        // })
        // .catch(err => {
        //     log('engine').error('Critical error. Pipeline load has failed.', err)
        // })
    } catch (error) {
        logger.error('Critical error. Program will stop.', error)
        process.exit(1)
    }
}

main();