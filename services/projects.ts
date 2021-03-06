import { promises as fs } from 'fs';
import { extname } from 'path';

export interface IProjectInfo {
  id: string;
  name: string;
}

export interface IProjectSourceFile {
  name: string;
  code: string;
  primary: boolean;
}

const CONTENT_DIR = `${process.cwd()}/content`;

export function getProjects() {
  return fs.readdir(CONTENT_DIR);
}

export function projectDir(id: string) {
  return `${CONTENT_DIR}/${id}`;
}

export async function getProject(id: string) {
  return {
    ...JSON.parse(await fs.readFile(`${projectDir(id)}/project.json`, 'utf-8')),
    id,
  } as IProjectInfo;
}

function sortByPrimaryThenName(file1: IProjectSourceFile, file2: IProjectSourceFile) {
  if (file1.primary) {
    return -1;
  }
  if (file2.primary) {
    return 1;
  }
  if (file1.name > file2.name) {
    return 1;
  }
  if (file2.name < file1.name) {
    return -1;
  }
  return 0;
}

export async function getProjectCode(id: string) {
  const files = await fs.readdir(projectDir(id));
  const result: IProjectSourceFile[] = [];
  const codeExtensions = ['.ino', '.c', '.h', 'cpp', '.cc'];
  for (const file of files) {
    const extension = extname(file.toLowerCase());
    if (codeExtensions.includes(extension)) {
      result.push({
        name: file,
        code: await fs.readFile(`${projectDir(id)}/${file}`, 'utf-8'),
        primary: extension === '.ino',
      });
    }
  }
  return result.sort(sortByPrimaryThenName);
}
