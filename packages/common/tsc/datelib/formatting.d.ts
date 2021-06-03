import { NativeFormatterOptions } from './formatting-native';
import { FuncFormatterFunc } from './formatting-func';
import { DateFormatter } from './DateFormatter';
export declare type FormatterInput = NativeFormatterOptions | string | FuncFormatterFunc;
export declare function createFormatter(input: FormatterInput): DateFormatter;
//# sourceMappingURL=formatting.d.ts.map