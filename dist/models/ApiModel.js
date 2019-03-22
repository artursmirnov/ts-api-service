import { ConfigurationException } from '../exceptions/ConfigurationException';
import { RestAdapter } from '../adapters/RestAdapter';
export class ApiModel {
    static getPath() {
        throw new ConfigurationException("Path is not defined for model");
    }
    static getAdapter(config) {
        return new RestAdapter(config);
    }
}
