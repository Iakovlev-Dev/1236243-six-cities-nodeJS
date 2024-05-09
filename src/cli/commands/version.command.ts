import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { resolve } from 'node:path';

type PackageJSONConfig = {
    version: string;
}

function isPackageJSONConfige (value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        Object.hasOwn(value, 'version')
  );
}
export class VersionCommand implements Command {
  constructor(
        private readonly filePath: string = 'package.json'
  ){}

  private readVersion(): string {
    const jsonConten = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContend: unknown = JSON.parse(jsonConten);

    if(!isPackageJSONConfige(importedContend)) {
      throw new Error('Failed to parse json content');
    }

    return importedContend.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try{
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if(error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
