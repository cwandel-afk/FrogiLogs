const Logger = require('./logger');

const logger = new Logger();
/* logger.log('Log message no class or method');
logger.error('Log message no class or method');
logger.info('Log message no class or method');
logger.warn('Log message no class or method'); */

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

const obj = {
    name: 'John',
    age: 30,
    friends: ['Jane', 'Bob'],
    home: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
    },
    company: {
        name: 'Acme Inc',
        industry: 'Technology',
        employees: 100
    },
    hobbies: [
        { name: 'reading', level: 'high' },
        { name: 'hiking', level: 'medium' }
    ],
    idiot: true,
    level: {
        more: {
            detail: 'yes',
            more2: {
                detail: 'fuck',
                more3: {
                    detail: 'wow',
                    wild: true,
                    more4: {
                        message: 'God damn right it goes this deep',
                        more5: {
                            wow: true
                        }
                    }
                }
            }
        }
    }
};
logger.logObject(obj);
const t = new test();
t.doLog();
t.doDetailLog();
t.doPrettyLog();
t.doImportantLog();

//logit();