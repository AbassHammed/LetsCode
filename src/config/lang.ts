import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { haskell } from '@codemirror/legacy-modes/mode/haskell';
import { lua } from '@codemirror/legacy-modes/mode/lua';
import { perl } from '@codemirror/legacy-modes/mode/perl';
import { r } from '@codemirror/legacy-modes/mode/r';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
import { swift } from '@codemirror/legacy-modes/mode/swift';
import { csharp } from '@replit/codemirror-lang-csharp';

export const languages = {
  'C++': {
    extension: cpp(),
    initialCode:
      '#include <iostream>\nint main() {\n    std::cout << "Hello, C++!";\n    return 0;\n}',
    fileExtension: '.cpp',
    backendIdentifier: 'cpp',
  },
  Python: {
    extension: python(),
    initialCode: 'print("Hello, Python!")',
    fileExtension: '.py',
    backendIdentifier: 'python',
  },
  JavaScript: {
    extension: javascript(),
    initialCode: 'console.log("Hello, JavaScript!");',
    fileExtension: '.js',
    backendIdentifier: 'javascript',
  },
  C: {
    extension: cpp(),
    initialCode: '#include <stdio.h>\nint main() {\n   printf("Hello, C!");\n   return 0;\n}',
    fileExtension: '.c',
    backendIdentifier: 'c',
  },
  Java: {
    extension: java(),
    initialCode:
      'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}',
    fileExtension: '.java',
    backendIdentifier: 'java',
  },
  Ruby: {
    extension: StreamLanguage.define(ruby),
    initialCode: 'puts "Hello, Ruby!"',
    fileExtension: '.rb',
    backendIdentifier: 'ruby',
  },
  Go: {
    extension: StreamLanguage.define(go),
    initialCode: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, Go!")\n}',
    fileExtension: '.go',
    backendIdentifier: 'go',
  },
  Rust: {
    extension: rust(),
    initialCode: 'fn main() {\n    println!("Hello, Rust!");\n}',
    fileExtension: '.rs',
    backendIdentifier: 'rust',
  },
  TypeScript: {
    extension: javascript({ typescript: true }),
    initialCode: 'console.log("Hello, TypeScript!");',
    fileExtension: '.ts',
    backendIdentifier: 'typescript',
  },
  PHP: {
    extension: php(),
    initialCode: '<?php\necho "Hello, PHP!";\n',
    fileExtension: '.php',
    backendIdentifier: 'php',
  },
  Swift: {
    extension: StreamLanguage.define(swift),
    initialCode: 'print("Hello, Swift!")',
    fileExtension: '.swift',
    backendIdentifier: 'swift',
  },
  Kotlin: {
    extension: cpp(),
    initialCode: 'fun main(args: Array<String>) {\n    println("Hello, Kotlin!")\n}',
    fileExtension: '.kt',
    backendIdentifier: 'kotlin',
  },
  'C#': {
    extension: csharp(),
    initialCode:
      'using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, C#!");\n    }\n}',
    fileExtension: '.cs',
    backendIdentifier: 'csharp',
  },
  Perl: {
    extension: StreamLanguage.define(perl),
    initialCode: 'print "Hello, Perl!\\n";',
    fileExtension: '.pl',
    backendIdentifier: 'perl',
  },
  Haskell: {
    extension: StreamLanguage.define(haskell),
    initialCode: 'main = putStrLn "Hello, Haskell!"',
    fileExtension: '.hs',
    backendIdentifier: 'haskell',
  },
  Lua: {
    extension: StreamLanguage.define(lua),
    initialCode: 'print("Hello, Lua!")',
    fileExtension: '.lua',
    backendIdentifier: 'lua',
  },
  R: {
    extension: StreamLanguage.define(r),
    initialCode: 'print("Hello, R!")',
    fileExtension: '.r',
    backendIdentifier: 'r',
  },
};
