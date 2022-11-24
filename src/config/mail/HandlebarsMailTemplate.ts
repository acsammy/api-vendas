import { promises } from 'fs';
import handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class handlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
