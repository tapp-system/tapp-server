type Sentence<Ending extends string = '.' | '!' | '?' | ';'> =
    `${string}${Ending}`;

export default Sentence;
