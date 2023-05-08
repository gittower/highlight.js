/*
Language: Objective-C
Author: Valerii Hiora <valerii.hiora@gmail.com>
Contributors: Angel G. Olloqui <angelgarcia.mail@gmail.com>, Matt Diephouse <matt@diephouse.com>, Andrew Farmer <ahfarmer@gmail.com>, Minh Nguyễn <mxn@1ec5.org>, Troy Stephens <troy@coherencelabs.com>
Website: https://developer.apple.com/documentation/objectivec
Category: common
*/

export default function(hljs) {
  const API_CLASS = {
    className: 'built_in',
    begin: '\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+'
  };
  const IDENTIFIER_RE = /[a-zA-Z_][a-zA-Z0-9_]*/;
  const AT_KEYWORD_RE = /@[a-zA-Z_][a-zA-Z0-9_]*/;
  const KEYWORD_RE = IDENTIFIER_RE;
  const OPERATORS = [
    "\\.",
    "->",
    "!=",
    "!",
    "==",
    "=",
    "\\+\\+",
    "\\+=",
    "\\+",
    "\\-\\-",
    "\\-=",
    "\\-",
    "\\*=",
    "\\*",
    "/=",
    "/",
    "%=",
    "%",
    "\\^=",
    "\\^",
    "\\|\\|",
    "\\|=",
    "\\|",
    "~",
    "&&",
    "&=",
    "&",
    "\\?",
    ":",
    "\\<\\<=",
    "\\<\\<",
    "\\<",
    "\\>\\>=",
    "\\>\\>",
    "\\>",
  ];
  const PUNCTUATION = [
    "\\;",
    "@{",
    "{",
    "}",
    "\\,",
    "\\(",
    "\\)",
    "@\\[",
    "\\[",
    "\\]",
  ];
  const TYPES = [
    "int",
    "float",
    "char",
    "unsigned",
    "signed",
    "short",
    "long",
    "double",
    "wchar_t",
    "unichar",
    "void",
    "bool",
    "BOOL",
    "id|0",
    "_Bool"
  ];
  const KWS = [
    "while",
    "export",
    "sizeof",
    "typedef",
    "const",
    "struct",
    "for",
    "union",
    "volatile",
    "static",
    "mutable",
    "if",
    "do",
    "return",
    "goto",
    "enum",
    "else",
    "break",
    "extern",
    "asm",
    "case",
    "default",
    "register",
    "explicit",
    "typename",
    "switch",
    "continue",
    "inline",
    "readonly",
    "assign",
    "readwrite",
    "self",
    "@synchronized",
    "id",
    "typeof",
    "nonatomic",
    "IBOutlet",
    "IBAction",
    "strong",
    "weak",
    "copy",
    "in",
    "out",
    "inout",
    "bycopy",
    "byref",
    "oneway",
    "__strong",
    "__weak",
    "__block",
    "__autoreleasing",
    "__bridge",
    "__bridge_transfer",
    "__bridge_retained",
    "__bridge_retain",
    "__covariant",
    "__contravariant",
    "__kindof",
    "_Nonnull",
    "_Nullable",
    "_Null_unspecified",
    "__FUNCTION__",
    "__PRETTY_FUNCTION__",
    "__attribute__",
    "getter",
    "setter",
    "retain",
    "unsafe_unretained",
    "nonnull",
    "nullable",
    "null_unspecified",
    "null_resettable",
    "class",
    "instancetype",
    "NS_DESIGNATED_INITIALIZER",
    "NS_UNAVAILABLE",
    "NS_REQUIRES_SUPER",
    "NS_RETURNS_INNER_POINTER",
    "NS_INLINE",
    "NS_AVAILABLE",
    "NS_DEPRECATED",
    "NS_ENUM",
    "NS_OPTIONS",
    "NS_SWIFT_UNAVAILABLE",
    "NS_ASSUME_NONNULL_BEGIN",
    "NS_ASSUME_NONNULL_END",
    "NS_REFINED_FOR_SWIFT",
    "NS_SWIFT_NAME",
    "NS_SWIFT_NOTHROW",
    "NS_DURING",
    "NS_HANDLER",
    "NS_ENDHANDLER",
    "NS_VALUERETURN",
    "NS_VOIDRETURN"
  ];
  const AT_KWS = [
    "@autoreleasepool",
    "@catch",
    "@class",
    "@compatibility_alias",
    "@defs",
    "@dynamic",
    "@encode",
    "@end",
    "@finally",
    "@implementation",
    "@import",
    "@interface",
    "@optional",
    "@package",
    "@private",
    "@property",
    "@protected",
    "@protocol",
    "@public",
    "@required",
    "@selector",
    "@synthesize",
    "@throw",
    "@try"
  ];
  const LITERALS = [
    "false",
    "true",
    "FALSE",
    "TRUE",
    "nil",
    "YES",
    "NO",
    "NULL"
  ];
  const BUILT_INS = [
    "dispatch_once_t",
    "dispatch_queue_t",
    "dispatch_sync",
    "dispatch_async",
    "dispatch_once"
  ];
  const KEYWORDS = {
    "variable.language": [
      "this",
      "super"
    ],
    $pattern: KEYWORD_RE,
    keyword: KWS,
    literal: LITERALS,
    built_in: BUILT_INS,
    type: TYPES
  };
  const CLASS_KEYWORDS = {
    $pattern: AT_KEYWORD_RE,
    keyword: [
      "@interface",
      "@class",
      "@protocol",
      "@implementation"
    ]
  };
  return {
    name: 'Objective-C',
    aliases: [
      'mm',
      'objc',
      'obj-c',
      'obj-c++',
      'objective-c++'
    ],
    keywords: KEYWORDS,
    illegal: '</',
    contains: [
      API_CLASS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      {
        className: 'string',
        variants: [
          {
            begin: '@"',
            end: '"',
            illegal: '\\n',
            contains: [ hljs.BACKSLASH_ESCAPE ]
          }
        ]
      },
      {
        className: 'meta',
        begin: /#\s*[a-z]+\b/,
        end: /$/,
        // Preprocessor directive syntax coloring looks better when we don't highlight keywords.
        // keywords: { keyword:
        //     'if else elif endif define undef warning error line '
        //     + 'pragma ifdef ifndef include' },
        contains: [
          {
            begin: /\\\n/,
            relevance: 0
          },
          hljs.inherit(hljs.QUOTE_STRING_MODE, { className: 'string' }),
          {
            className: 'string',
            begin: /<.*?>/,
            end: /$/,
            illegal: '\\n'
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        className: 'class',
        begin: '(' + CLASS_KEYWORDS.keyword.join('|') + ')\\b',
        end: /(\(|\{|$)/,
        excludeEnd: true,
        keywords: CLASS_KEYWORDS,
        contains: [ hljs.UNDERSCORE_TITLE_MODE ]
      },
      {
        scope: 'keyword',
        $pattern: AT_KEYWORD_RE,
        begin: '(' + AT_KWS.join('|') + ')\\b',
      },
      {
        /* non-keyword identifiers */
        scope: 'symbol',
        begin: '\\b(?!(' + (KWS.concat(CLASS_KEYWORDS.keyword)).join('|') + ')\\b)[a-zA-Z@_][a-zA-Z0-9_]*',
        relevance: 0
      },
      {
        scope: 'operator',
        begin: '(' + OPERATORS.join('|') + ')',
        relevance: 0
      },
      {
        scope: 'punctuation',
        begin: '(' + PUNCTUATION.join('|') + ')',
        relevance: 0
      }
    ]
  };
}
