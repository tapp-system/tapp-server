type Conditional<C, V, T1, T2> = C extends V ? T1 : T2;

export default Conditional;
