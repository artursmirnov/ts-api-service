import { Exception } from './Exception';
export class ConfigurationException extends Exception {
    constructor() {
        super(...arguments);
        this.defaultMessage = 'Unknown Configuration error';
    }
}
