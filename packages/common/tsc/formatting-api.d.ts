import { NativeFormatterOptions } from './datelib/formatting-native';
import { DateInput } from './api-type-deps';
export interface FormatDateOptions extends NativeFormatterOptions {
    locale?: string;
}
export interface FormatRangeOptions extends FormatDateOptions {
    separator?: string;
    isEndExclusive?: boolean;
}
export declare function formatDate(dateInput: DateInput, options?: FormatDateOptions): string;
export declare function formatRange(startInput: DateInput, endInput: DateInput, options: FormatRangeOptions): string;
//# sourceMappingURL=formatting-api.d.ts.map