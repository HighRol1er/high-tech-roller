### ESLint 설정

<주요 규칙>

1. import type 강제: 오직 타입으로만 쓰이는 임포트는 자동으로 import type 변환.
2. type 임포트 (최상단)
3. react, next 라이브러리 (상단 고정)
4. 나머지 라이브러리 및 내부 파일 (알파벳 순)
5. 시각적 최적화: prettier/prettier 규칙을 off로 설정하여 실시간 경고 제거.

### Prettier

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```
