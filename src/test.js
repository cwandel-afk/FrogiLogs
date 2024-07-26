const Logger = require('./logger');

const logger = new Logger();
logger.log('Log message no class or method');
logger.error('Log message no class or method');
logger.info('Log message no class or method');
logger.warn('Log message no class or method');

/* logger.log('Log message no class or method', 'detailed');
logger.error('Log message no class or method', 'detailed');
logger.info('Log message no class or method', 'detailed');
logger.warn('Log message no class or method', 'detailed'); */

/* logger.log('Log message no class or method', 'pretty');
logger.error('Log message no class or method', 'pretty');
logger.info('Log message no class or method', 'pretty');
logger.warn('Log message no class or method', 'pretty'); */

/* logger.log('Log message no class or method', 'important');
logger.error('Log message no class or method', 'important');
logger.info('Log message no class or method', 'important');
logger.warn('Log message no class or method', 'important'); */

class test {
    doLog() {
        logger.log('Log message from class method');
        logger.error('Log message from class method');
        logger.info('Log message from class method');
        logger.warn('Log message from class method');
    }

    doDetailLog(){
        logger.log('Log message from class method', 'detailed');
        logger.error('Log message from class method', 'detailed');
        logger.info('Log message from class method', 'detailed');
        logger.warn('Log message from class method', 'detailed');
    }

    doPrettyLog(){
        logger.log('Log message from class method', 'pretty');
        logger.error('Log message from class method', 'pretty');
        logger.info('Log message from class method', 'pretty');
        logger.warn('Log message from class method', 'pretty');
    }

    doImportantLog(){
        logger.log('Log message from class method', 'important');
        logger.error('Log message from class method', 'important');
        logger.info('Log message from class method', 'important');
        logger.warn('Log message from class method', 'important');
    }
}

function logit() {
    const _l = new Logger();
    _l.log('Log message from function');
    _l.error('Log message from function');
    _l.info('Log message from function');
    _l.warn('Log message from function');
    _l.log('Log message from function', 'detailed');
    _l.error('Log message from function', 'detailed');
    _l.info('Log message from function', 'detailed');
    _l.warn('Log message from function', 'detailed');
    _l.log('Log message from function', 'pretty');
    _l.error('Log message from function', 'pretty');
    _l.info('Log message from function', 'pretty');
    _l.warn('Log message from function', 'pretty');
    _l.log('Log message from function', 'important');
    _l.error('Log message from function', 'important');
    _l.info('Log message from function', 'important');
    _l.warn('Log message from function', 'important');
}

const t = new test();
t.doLog();
//t.doDetailLog();
//t.doPrettyLog();
//t.doImportantLog();

logit();