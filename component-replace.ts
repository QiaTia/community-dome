import { promises as fs } from "fs";
export default function componentReplace({ type = 'vue' }: { path: string } = {}) {
  return {
    name: 'transform-component',
    transform(src: string, id: string) {
      if (RegExp(`[\\w\\W]+layout\.${type}$`).test(id)) {
        console.log(src);
        fs.writeFile('./temp.json', src);
        return ;
        return {
          code: stringReplace(src),
          map: null // 如果可行将提供 source map
        }
      }
    },
  }
}

function stringReplace(code: string) {
  code.replaceAll()
}