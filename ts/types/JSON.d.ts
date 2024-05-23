type JSON =
    | (string | number | boolean | JSON | null)[]
    | {
          [key: string]: string | number | boolean | JSON | null;
      };

export default JSON;
