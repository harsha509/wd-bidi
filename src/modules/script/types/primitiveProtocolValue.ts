export type PrimitiveProtocolValue =
    UndefinedValue |
    NullValue |
    StringValue |
    NumberValue |
    BooleanValue |
    BigIntValue;

type UndefinedValue = {
    type: "undefined";
};

type NullValue = {
    type: "null";
};

type StringValue = {
    type: "string";
    value: string;
};

type SpecialNumber = "NaN" | "-0" | "Infinity" | "-Infinity";

type NumberValue = {
    type: "number";
    value: number | SpecialNumber;
};

type BooleanValue = {
    type: "boolean";
    value: boolean;
};

type BigIntValue = {
    type: "bigint";
    value: string;
};