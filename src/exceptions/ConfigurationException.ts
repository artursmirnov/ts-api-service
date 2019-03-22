import { Exception } from './Exception';

export class ConfigurationException extends Exception {
  protected defaultMessage: string = 'Unknown Configuration error';
}
