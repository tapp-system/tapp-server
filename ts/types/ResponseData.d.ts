type ObjectKeys = string | number;

type Types = ObjectKeys | Date | boolean | null;

type ResponseData =
    | Types
    | {
          [key: ObjectKeys]: Types | ResponseData;
      }
    | ResponseData[];

export default ResponseData;
